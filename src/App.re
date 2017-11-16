let _toArray = Array.of_list;
open Rebase;

let component = ReasonReact.reducerComponent("App");
let make = _children => AppState.{
  ...component,

  initialState: AppState.initial,

  didMount: ({ reduce, state }) => {
    ReasonReact.Update({
      ...state,
      worker: ref(Worker.make(
        ~onMessage=reduce(message => WorkerMessage(message)),
        ~onError=Js.log
      ))
    })
  },

  reducer: AppState.reducer,

  render: ({ reduce, state }) =>
    <div>
      <Toolbar onButtonClick=reduce(
        fun | `RunAll => RunAll
            | `Add => Add
            | `Clear => Clear
      ) />

      (
        switch state.error {
        | Error(message) => <Message type_=`Error message />
        | Warning(message) => <Message type_=`Warning message />
        | Nothing => ReasonReact.nullElement
        }
      )

      <SetupBlock code=state.setupCode
                  onChange=reduce(code => SetupChanged(code)) />

      (
        state.testCases |> List.map(this =>
                              <TestCase.View
                                key=(this.data.id |> TestCase.Id.toString)
                                onChange=reduce(data => Change(data))
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
};
