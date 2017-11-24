let _toArray = Array.of_list;
let _assoc = List.assoc;
let _remove_assoc = List.remove_assoc;
open Rebase;

type t = {
  tests: list((Test.id, Test.state)),
  worker: ref(Worker.t)
};

type actions =
  | AddTest
  | UpdateTest(Test.t)
  | RemoveTest(Test.t)
  | UpdateSetup(string)
  | Clear
  | RunAll
  | RunSingle(Test.t)
  | WorkerMessage(Worker.Message.receive)
;

let _recalculateScores = (tests) => {
  let fastest =
    tests |> List.map(
              fun | (_, Test.Complete({ hz }, _)) => Some(hz)
                  | _ => None)
          |> List.filter(Option.isSome)
          |> List.map(Option.getOrRaise)
          |> List.reduce(Js.Math.max_float, 0.);

  tests |> List.map(
            fun | (id, Test.Complete({ hz } as result, _)) =>
                  (id, Test.Complete(result, Some((hz -. fastest) /. fastest *. 100.)))
                | test => test)
};

let component = ReasonReact.reducerComponent("App");
let make = (~data, ~url, ~updateStore, ~compilerResult, _children) => {
  ...component,

  initialState: () => {
    tests: [],
    worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log)) /* TODO: a bit hacky default */
  },

  didMount: ({ reduce, state }) => {
    ReasonReact.Update({
      ...state,
      worker: ref(Worker.make(
        ~onMessage=reduce(message => WorkerMessage(message)),
        ~onError=Js.log
      ))
    })
  },

  reducer: (action, state) => {
    let run = tests =>
      switch compilerResult {
      | Ok(code)
      | Warning(code, _) =>
        state.worker^.postMessage(Run(code, tests));
      | _ => ()
      };

    switch action {
    
    | AddTest =>
      ReasonReact.SideEffects(
        _self => updateStore(Store.AddTest)
      )

    | UpdateTest(test) =>
      ReasonReact.UpdateWithSideEffects({
          ...state,
          tests:
            List.map(((id, _) as this) => id !== test.id ? this : (id, Test.Untested), state.tests)
            |> _recalculateScores
        },
        _self => updateStore(Store.UpdateTest(test))
      )

    | RemoveTest(test) =>
      ReasonReact.UpdateWithSideEffects({
          ...state,
          tests:
            List.filter(((id, _)) => id !== test.id, state.tests)
            |> _recalculateScores
        },
        _self => updateStore(Store.RemoveTest(test))
      )

    | UpdateSetup(code) =>
      ReasonReact.UpdateWithSideEffects({
          ...state,
          tests: []
        },
        _self => updateStore(Store.UpdateSetup(code))
      )

    | Clear =>
      ReasonReact.UpdateWithSideEffects({
          ...state,
          tests: []
        },
        _self => updateStore(Store.Clear)
      )
    
    | RunAll =>
      ReasonReact.SideEffects(
        _self => run(data.tests |> List.map(this => this.Test.id))
      )
  
    | RunSingle(test) =>
      ReasonReact.SideEffects(
        _self => run([test.id])
      )
  
    | WorkerMessage(CaseCycle(id, result)) =>
      ReasonReact.Update({
        ...state,
        tests: [(id, Test.Running(result)), ..._remove_assoc(id, state.tests)]
      })
  
    | WorkerMessage(SuiteCycle(id, result)) =>
      ReasonReact.Update({
        ...state,
        tests:
          [(id, Test.Complete(result, None)), ..._remove_assoc(id, state.tests)]
          |> _recalculateScores
      })
  
    | WorkerMessage(SuiteComplete) =>
      ReasonReact.NoUpdate
    }
  },

  render: ({ reduce, state }) =>
    <div>
      <Toolbar onButtonClick=reduce(
                  fun | `RunAll => RunAll
                      | `Add    => AddTest
                      | `Clear  => Clear)
              shareableUrl=url />

      (
        switch compilerResult {
        | Compiler.Error(message) => <Message type_=`Error message />
        | Compiler.Warning(_, message) => <Message type_=`Warning message />
        | _ => ReasonReact.nullElement
        }
      )

      <SetupBlock code=data.Store.setup
                  onChange=reduce(code => UpdateSetup(code)) />

      (
        data.tests |> List.map(test =>
                        <TestBlock
                          key=(test.Test.id |> Test.Id.toString)
                          onChange=reduce(changed => UpdateTest(changed))
                          onRun=reduce(() => RunSingle(test))
                          onRemove=reduce(() => RemoveTest(test))
                          data=test
                          state=(try (_assoc(test.id, state.tests)) {
                            | Not_found => Test.Untested
                            })
                        />)
                    |> List.reverse
                    |> _toArray
                    |> ReasonReact.arrayToElement
      )

      (
        switch compilerResult {
        | Ok(code)
        | Warning(code, _) => <JSBlock code />
        | _ => ReasonReact.nullElement
        }
      )
    </div>
};
