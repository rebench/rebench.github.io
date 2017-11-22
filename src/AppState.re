open Rebase;

type statefulTestCase = {
  data: TestCase.t,
  state: TestCase.state
};

type t = {
  setupCode: string,
  testCases: list(statefulTestCase),
  worker: ref(Worker.t),
  compiledCode: string,
  error: option(Compiler.result),
};

type actions =
  | RunAll
  | RunSingle(TestCase.t)
  | Add
  | Remove(TestCase.t)
  | Clear
  | Change(TestCase.t)
  | ChangeSetup(string)
  | WorkerMessage(Worker.Message.receive)
  | Compile
  | CompileComplete(Compiler.result)
;

module Decode = {
  let id: Js.Json.t => TestCase.Id.t = json => 
    json |> Json.Decode.string |> Obj.magic;

  let testCase: Js.Json.t => TestCase.t = json => {
    let (id, code) = Json.Decode.(json |> pair(id, string));
    { id, code }
  };

  let state: Js.Json.t => (string, list(TestCase.t)) = json =>
    Json.Decode.(json |> pair(string, list(testCase)))
};

module Encode = {
  let id: TestCase.Id.t => Js.Json.t = value =>
    value |> TestCase.Id.toString |> Json.Encode.string;

  let testCase: TestCase.t => Js.Json.t = value =>
    Json.Encode.(pair(id, string, (value.id, value.code)));

  let state: ((string, list(TestCase.t))) => Js.Json.t = value =>
    Json.Encode.(pair(string, list(testCase), value));
};

let _retrieve = () =>
  Location.retrieve() |> Option.or_(Storage.retrieve())
                      |> Option.map(Js.Json.parseExn)
                      |> Option.map(Decode.state); /* TODO: bs-json */

let _updateResults = testCases => {
  let completed =
    testCases |> List.map(this => switch this.state {
                                  | Complete(result) =>
                                    Some((this.data.id, result))
                                  | _ =>
                                      None
                                  })
              |> List.filter(Option.isSome)
              |> List.map(Option.getOrRaise);

  let fastest =
    completed |> List.map(((_, { TestCase.hz })) => hz)
              |> List.reduce(Js.Math.max_float, 0.);

  testCases |> List.map(this => {
                let result =
                  completed |> List.find(((id, _)) => this.data.id === id)
                            |> Option.map(((_, result)) => result);

                switch result {
                | Some({ TestCase.hz } as result) => {
                  ...this,
                  state: Complete({
                    ...result,
                    relativeScore: Some((hz -. fastest) /. fastest *. 100.)
                  })
                }
                | None => this
                }
              })
};
let nextId = state =>
  state.testCases |> List.map(this => this.data.id)
                  |> TestCase.Id.next;

let withState = data => {
  data,
  state: TestCase.Virgin
};

let default = {
  setupCode: "/* code goes here */",
  testCases: [
    withState({ id: TestCase.Id.fromInt(2), code:  "Js.String.make(42)" }),
    withState({ id: TestCase.Id.fromInt(1), code: "string_of_int(42)" })
  ],
  worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log)),
  compiledCode: "// nothing yet",
  error: None
};

let initial = () => {
  _retrieve()
  |> Option.mapOr(
       ((setupCode, testCases)) => {
         ...default,
         setupCode,
         testCases: testCases |> List.map(withState)
       },
       default
    )
};

let reducer = (action, state) => {
  let tryCompile = state =>
    state.testCases |> List.map(this => this.data)
                    |> Compiler.compile(state.setupCode);

  switch action {
  
  | RunAll =>
    ReasonReact.SideEffects(
      self => {
        let result = tryCompile(self.state);
        self.reduce(() => CompileComplete(result))();

        let ids = self.state.testCases |> List.map(this => this.data.id);

        switch result {
        | Ok(code)
        | Warning(code, _) =>
          state.worker^.postMessage(Run(code, ids));
        | _ => ()
        }
      }
    )

  | RunSingle(data) =>
    ReasonReact.SideEffects(
      self => {
        let result = tryCompile(state);
        self.reduce(() => CompileComplete(result))();

        switch result {
        | Ok(code)
        | Warning(code, _) =>
          state.worker^.postMessage(Run(code, [data.id]));
        | _ => ()
        }
      }
    )

  | Add =>
    ReasonReact.Update({
      ...state,
      testCases: [withState(TestCase.{ id: nextId(state), code: "/* put stuff here */" }), ...state.testCases]
    })

  | Remove(target) =>
    ReasonReact.Update({
      ...state,
      testCases: List.filter(this => this.data.id !== target.id, state.testCases)
    })

  | Clear => 
    ReasonReact.Update({
      ...state,
      setupCode: default.setupCode,
      testCases: default.testCases
    })

  | Change(target) =>
    ReasonReact.UpdateWithSideEffects({
      ...state,
        testCases:
          List.map(this => this.data.id === target.id ? { data: target, state: TestCase.Virgin } : this, state.testCases)
          |> _updateResults
      },
      self => self.reduce(() => Compile)()
    )

  | ChangeSetup(code) =>
    ReasonReact.UpdateWithSideEffects({
        ...state,
        setupCode: code
      },
      self => self.reduce(() => Compile)()
    )
  
  | WorkerMessage(CaseCycle(id, result)) =>
    ReasonReact.Update({
      ...state,
      testCases: List.map(this => this.data.id === id ? { ...this, state: TestCase.Running(result) } : this, state.testCases)
    })

  | WorkerMessage(SuiteCycle(id, result)) =>
    ReasonReact.Update({
      ...state,
      testCases:
        List.map(this => this.data.id === id ? { ...this, state: TestCase.Complete(result) } : this, state.testCases)
        |> _updateResults
    })

  | WorkerMessage(SuiteComplete) =>
    ReasonReact.NoUpdate

  | Compile =>
    ReasonReact.SideEffects(
      self => tryCompile(self.state) |> self.reduce(result => CompileComplete(result))
    )

  | CompileComplete(result) =>
    ReasonReact.Update({
      ...state,
      compiledCode:
        switch result {
        | Ok(code)
        | Warning(code, _) => code
        | _ => "// ERROR"
        },
      error: Some(result)
    })

  }
};

let computeShareableUrl = state =>
  (state.setupCode, state.testCases |> List.map(t => t.data))
  |> Encode.state
  |> Location.generate;

let didUpdate = ({ ReasonReact.oldSelf, newSelf }) => {
  (newSelf.state.setupCode, newSelf.state.testCases |> List.map(t => t.data))
  |> Encode.state
  |> Storage.persist;

  newSelf.state |> computeShareableUrl
                |> Location.set
};
