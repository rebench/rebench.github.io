let _toArray = Array.of_list;
open Rebase;

type testCase = {
  data: TestCase.t,
  state: TestCase.state
};

type state = {
  setupCode: string,
  testCases: list(testCase),
  worker: ref(Worker.t),
  compiledCode: string,
};

type action =
  | RunAll
  | RunSingle(TestCase.t)
  | Add
  | Remove(TestCase.t)
  | Change(TestCase.t)
  | SetupChanged(string)
  | WorkerMessage(Worker.Message.receive);

let _updateResults = (testCases) => {
  let completed =
    testCases |> List.map((this) =>
                  switch this.state {
                  | Complete(result) => Some((this.data.id, result))
                  | _ => None
                  })
              |> List.filter(Option.isSome)
              |> List.map(Option.getOrRaise);

  let fastest =
    completed |> List.map(((_, { TestCase.hz })) => hz)
              |> List.reduce(Js.Math.max_float, 0.);

  testCases |> List.map((this) => {
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

let component = ReasonReact.reducerComponent("App");

let make = (_children) => {

  let newId = Utils.makeCounter(1);
  let wrapTestCase = (data) => {
    data,
    state: TestCase.Virgin
  };
  let makeTestCase = () =>
    newId() |> TestCase.make
            |> wrapTestCase;

  let retrieve = () => {
    let fromQueryParam = () => None;

    let fromLocalStorage = () =>
      Dom.Storage.(localStorage |> getItem("rebench-data"))
      |> Option.map(Js.Json.parseExn)
      |> Option.map((Obj.magic: Js.Json.t => (string, list(TestCase.t))));

    fromQueryParam()
    |> Option.or_(fromLocalStorage())
    |> Option.map(((code, cases)) => (code, cases |> List.map(wrapTestCase)))
    |> Option.getOr(("/* code goes here */", [makeTestCase(), makeTestCase()]))
  };

  let persist = (setupCode, testCases) => {
    try {
      let data =
        (setupCode, testCases |> List.map((this) => this.data))
        |> Js.Json.stringifyAny
        |> Option.getOrRaise;

      Dom.Storage.(localStorage |> setItem("rebench-data", data))
    } {
    | e => Js.log(e)
    }
  };

  {
    ...component,

    initialState: () => {
      let (setupCode, testCases) = retrieve();
      {
        setupCode,
        testCases,
        worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log)),
        compiledCode: "// nothing yet"
      }
    },

    didMount: ({ reduce, state }) => {
      ReasonReact.Update({
        ...state,
        worker: ref(Worker.make(
          ~onMessage=reduce((message) => WorkerMessage(message)),
          ~onError=Js.log
        ))
      })
    },

    reducer: (action, state) => {
      let setPersistentState = (setupCode, testCases) => {
        persist(setupCode, testCases);
        { ...state, setupCode, testCases }
      };

      let setCompiledCode = (state) => {
        ...state,
        compiledCode:
          state.testCases |> List.map((this) => this.data)
                          |> Compiler.compile(state.setupCode)
      };

      switch action {
      
      | RunAll => {
        let state = setCompiledCode(state);
        let ids = state.testCases |> List.map((this) => this.data.id);

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
          [makeTestCase(), ...state.testCases]
          |> setPersistentState(state.setupCode)
        )

      | Remove(target) =>
        ReasonReact.Update(
          List.filter((this) => this.data.id !== target.id, state.testCases)
          |> setPersistentState(state.setupCode)
        )

      | Change(target) =>
        ReasonReact.Update(
          List.map((this) => this.data.id === target.id ? { data: target, state: TestCase.Virgin } : this, state.testCases)
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
          List.map((this) => this.data.id === id ? { ...this, state: TestCase.Running(result) } : this, state.testCases)
          |> setPersistentState(state.setupCode)
        )

      | WorkerMessage(SuiteCycle(id, result)) =>
        ReasonReact.Update(
          List.map((this) => this.data.id === id ? { ...this, state: TestCase.Complete(result) } : this, state.testCases)
          |> _updateResults
          |> setPersistentState(state.setupCode)
        )

      | WorkerMessage(SuiteComplete) =>
        ReasonReact.NoUpdate

      }
    },

    render: ({ reduce, state }) =>
      <div>
        <Toolbar onButtonClick=reduce(
          fun | `RunAll => RunAll
              | `Add => Add
        ) />

        <SetupBlock code=state.setupCode
                    onChange=reduce((code) => SetupChanged(code)) />

        (
          state.testCases |> List.map((this) =>
                               <TestCase.View
                                 key=this.data.id
                                 onChange=reduce((data) => Change(data))
                                 onRun=reduce(() => RunSingle(this.data))
                                 onRemove=reduce(() => Remove(this.data))
                                 data=this.data
                                 state=this.state
                               />)
                          |> List.reverse
                          |> _toArray
                          |> ReasonReact.arrayToElement
        )

        <JSBlock code=state.compiledCode />
      </div>
  }
};
