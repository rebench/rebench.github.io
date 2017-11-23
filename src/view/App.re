let _toArray = Array.of_list;
let _assoc = List.assoc;
let _remove_assoc = List.remove_assoc;
open Rebase;

type t = {
  tests: list((Test.id, Test.state)),
  worker: ref(Worker.t)
};

type actions =
  | RunAll
  | RunSingle(Test.t)
  | WorkerMessage(Worker.Message.receive)
;
/*
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
*/


let component = ReasonReact.reducerComponent("App");
let make = (~data, ~url, ~updateStore, ~compilerResult, _children) => {
  ...component,

  initialState: () => {
    tests: [],
    worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log))
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
    switch action {
    
    | RunAll =>
      ReasonReact.SideEffects(
        self => {
          let ids = data.tests |> List.map(this => this.Test.id);
  
          switch compilerResult {
          | Ok(code)
          | Warning(code, _) =>
            self.state.worker^.postMessage(Run(code, ids));
          | _ => ()
          }
        }
      )
  
    | RunSingle(test) =>
      ReasonReact.SideEffects(
        self => {
          switch compilerResult {
          | Ok(code)
          | Warning(code, _) =>
            self.state.worker^.postMessage(Run(code, [test.id]));
          | _ => ()
          }
        }
      )
  
    | WorkerMessage(CaseCycle(id, result)) =>
      ReasonReact.Update({
        ...state,
        tests: [(id, Test.Running(result)), ..._remove_assoc(id, state.tests)]
      })
  
    | WorkerMessage(SuiteCycle(id, result)) =>
      ReasonReact.Update({
        ...state,
        tests: [(id, Test.Complete(result)), ..._remove_assoc(id, state.tests)]
      })
  
    | WorkerMessage(SuiteComplete) =>
      ReasonReact.NoUpdate
    }
  },

  render: ({ reduce, state }) => {

    <div>
      <Toolbar onButtonClick=(
                  fun | `RunAll => reduce(() => RunAll)()
                      | `Add => updateStore(Store.AddTest)
                      | `Clear => updateStore(Store.Clear))
              shareableUrl=url />

      (
        switch compilerResult {
        | Compiler.Error(message) => <Message type_=`Error message />
        | Compiler.Warning(_, message) => <Message type_=`Warning message />
        | _ => ReasonReact.nullElement
        }
      )

      <SetupBlock code=data.Store.setup
                  onChange=(code => updateStore(Store.UpdateSetup(code))) />

      (
        data.tests |> List.map(test =>
                        <TestBlock
                          key=(test.Test.id |> Test.Id.toString)
                          onChange=(changed => updateStore(Store.UpdateTest(changed)))
                          onRun=reduce(() => RunSingle(test))
                          onRemove=(() => updateStore(Store.RemoveTest(test)))
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
  }
};
