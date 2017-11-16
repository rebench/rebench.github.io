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
};

type actions =
  | RunAll
  | RunSingle(TestCase.t)
  | Add
  | Remove(TestCase.t)
  | Clear
  | Change(TestCase.t)
  | SetupChanged(string)
  | WorkerMessage(Worker.Message.receive);

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
  compiledCode: "// nothing yet"
};

let initial = () => {
  Storage.retrieve()
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
  let setPersistentState = (setupCode, testCases) => {
    Storage.persist(setupCode, testCases |> List.map(t => t.data));
    { ...state, setupCode, testCases }

  };

  let setCompiledCode = state => {
    ...state,
    compiledCode:
      state.testCases |> List.map(this => this.data)
                      |> Compiler.compile(state.setupCode)
  };

  switch action {
  
  | RunAll => {
    let state = setCompiledCode(state);
    let ids = state.testCases |> List.map(this => this.data.id);

    state.worker^.postMessage(Run(state.compiledCode, ids));
    ReasonReact.Update(state)
  }

  | RunSingle(data) => {
    let state = setCompiledCode(state);

    state.worker^.postMessage(Run(state.compiledCode, [data.id]));
    ReasonReact.Update(state)
  }

  | Add =>
    ReasonReact.Update(
      [withState(TestCase.{ id: nextId(state), code: "/* put stuff here */" }), ...state.testCases]
      |> setPersistentState(state.setupCode)
    )

  | Remove(target) =>
    ReasonReact.Update(
      List.filter(this => this.data.id !== target.id, state.testCases)
      |> setPersistentState(state.setupCode)
    )

  | Clear => 
    ReasonReact.Update(
      setPersistentState(default.setupCode, default.testCases)
    )

  | Change(target) =>
    ReasonReact.Update(
      List.map(this => this.data.id === target.id ? { data: target, state: TestCase.Virgin } : this, state.testCases)
      |> _updateResults
      |> setPersistentState(state.setupCode)
      |> setCompiledCode
    )

  | SetupChanged(code) =>
    ReasonReact.Update(
      setPersistentState(code, state.testCases)
      |> setCompiledCode
    )
  
  | WorkerMessage(CaseCycle(id, result)) =>
    ReasonReact.Update(
      List.map(this => this.data.id === id ? { ...this, state: TestCase.Running(result) } : this, state.testCases)
      |> setPersistentState(state.setupCode)
    )

  | WorkerMessage(SuiteCycle(id, result)) =>
    ReasonReact.Update(
      List.map(this => this.data.id === id ? { ...this, state: TestCase.Complete(result) } : this, state.testCases)
      |> _updateResults
      |> setPersistentState(state.setupCode)
    )

  | WorkerMessage(SuiteComplete) =>
    ReasonReact.NoUpdate

  }
};