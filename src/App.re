let _toArray = Array.of_list;
open Rebase;

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
  | RunSingle(TestCase.t)
  | Add
  | Remove(TestCase.t)
  | Change(TestCase.t)
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
        comparison: Some((hz -. fastest) /. fastest *. 100.)
      })
    }
    | None => this
    }
  })
};


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

      | RunSingle(data) => {
        let code = Compiler.compile([data]);

        state.worker^.postMessage(Run(code, [data.id]));
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
          testCases: _updateResults(
            List.map((this) => this.data.id === target.id ? { data: target, state: TestCase.Virgin } : this, state.testCases)
          )
        })
      
      | WorkerMessage(CaseCycle(id, result)) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === id ? { ...this, state: TestCase.Running(result) } : this, state.testCases)
        })

      | WorkerMessage(SuiteCycle(id, result)) =>
        ReasonReact.Update({
          ...state,
          testCases: _updateResults(
            List.map((this) => this.data.id === id ? { ...this, state: TestCase.Complete(result) } : this, state.testCases)
          )
        })

      | WorkerMessage(SuiteComplete) => {
        ReasonReact.NoUpdate
      }

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
                                 onRun=reduce(() => RunSingle(this.data))
                                 onRemove=reduce(() => Remove(this.data))
                                 data=this.data
                                 state=this.state
                               />)
                          |> List.reverse
                          |> _toArray
                          |> ReasonReact.arrayToElement
        )
      </div>
  }
};
