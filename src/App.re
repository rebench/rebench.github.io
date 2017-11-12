type testCase = {
  data: TestCase.t,
  state: TestCase.state
};

type state = {
  testCases: list(testCase),
  worker: ref(Worker.t),
};

type action =
  | RunAll
  | Add
  | Remove(TestCase.t)
  | Change(TestCase.t)
  | WorkerMessage(Worker.Message.receive);

let component = ReasonReact.reducerComponent("App");
let make = (_children) => {

  let newId = Utils.makeCounter(1);
  let makeTestCase = () => {
    data: TestCase.make(newId()),
    state: TestCase.Virgin
  };

  {
    ...component,

    initialState: () => {
      testCases: [makeTestCase(), makeTestCase()],
      worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log))
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

    reducer: (action, state) =>
      switch action {
      
      | RunAll => {
        let code = state.testCases |> List.map((this) => this.data)
                                   |> Compiler.compile;

        let ids = state.testCases |> List.map((this) => this.data.id);

        state.worker^.postMessage(Run(code, ids));
        ReasonReact.NoUpdate
      }

      | Add =>
        ReasonReact.Update({
          ...state,
          testCases: [makeTestCase(), ...state.testCases]
        })

      | Remove(target) =>
        ReasonReact.Update({
          ...state,
          testCases: List.filter((this) => this.data.id !== target.id, state.testCases)
        })

      | Change(target) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === target.id ? { data: target, state: TestCase.Virgin } : this, state.testCases)
        })
      
      | WorkerMessage(CaseCycle(id, result)) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === id ? { ...this, state: Running(result) } : this, state.testCases)
        })

      | WorkerMessage(SuiteCycle(id, result)) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === id ? { ...this, state: Complete(result) } : this, state.testCases)
        })

      | WorkerMessage(SuiteComplete) =>
        ReasonReact.NoUpdate

      },

    render: ({ reduce, state }) =>
      <div>
        <Toolbar onButtonClick=reduce(
          fun | `RunAll => RunAll
              | `Add => Add
        ) />
        (
          state.testCases |> List.map((this) =>
                               <TestCase.View
                                 key=this.data.id
                                 onChange=reduce((data) => Change(data))
                                 onRemove=reduce(() => Remove(this.data))
                                 data=this.data
                                 state=this.state
                               />)
                          |> List.rev
                          |> Array.of_list
                          |> ReasonReact.arrayToElement
        )
      </div>
  }
};
