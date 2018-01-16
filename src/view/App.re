let _assoc = List.assoc;
let _remove_assoc = List.remove_assoc;
open!  Rebase;
open!  Vrroom.Helpers;
module Control = Vrroom.Control;
module Styles = AppStyles;

type state = {
  worker:   ref(Worker.t),
  showHelp: bool
};

type actions =
  | RunAll
  | RunSingle(Test.t)
  | ShowHelp
  | HideHelp
  | WorkerMessage(Worker.Message.receive)
;

let component = ReasonReact.reducerComponent("App");
let make = (~data: Store.state(Store.data),
            ~url,
            ~updateStore,
            _children) => {
  ...component,

  initialState: () => {
    worker: ref(Worker.make(~onMessage=Js.log)), /* TODO: a bit hacky default */
    showHelp: false
  },

  didMount: ({ send, state }) => {
    ReasonReact.Update({
      ...state,
      worker: ref(Worker.make(
        ~onMessage  = {message => send(WorkerMessage(message))}
      ))
    })
  },

  reducer: (action, state) => {
    let run = tests =>
      tests |> List.map((test: Test.t) => (test.id, Compiler.compileTest(data.current.setup, test)))
            |> List.map(
                 fun | (id, Compiler.Ok(code)) => (id, code)
                     | (id, Warning(code, _))  => (id, code)
                     | (id, _)                 => (id, "throw Error('failed to compile');"))
            |> tests => state.worker^.postMessage(Run(tests));

    switch action {
    
    | RunAll =>
      ReasonReact.SideEffects(
        _self => run(data.current.tests |> List.map(this => this.Store.data))
      )
    | RunSingle(test) =>
      ReasonReact.SideEffects(
        _self => run([test])
      )

    | ShowHelp => 
      ReasonReact.Update({ ...state, showHelp: true })
    | HideHelp => 
      ReasonReact.Update({ ...state, showHelp: false })
  
    | WorkerMessage(TestCycle(id, result)) =>
      ReasonReact.SideEffects(
        _self => updateStore(Store.UpdateTestState(id, Test.Running(result)))
      )

    | WorkerMessage(TestError(id, error)) =>
      ReasonReact.SideEffects(
        _self => updateStore(Store.UpdateTestState(id, Test.Error(error)))
      )
  
    | WorkerMessage(SuiteCycle(id, result)) =>
      ReasonReact.SideEffects(
        _self => updateStore(Store.UpdateTestState(id, Test.Complete(result, None)))
      )
  
    | WorkerMessage(SuiteComplete) =>
      ReasonReact.NoUpdate

    | WorkerMessage(WorkerError(error)) =>
      ReasonReact.SideEffects(
        _self => Js.log(error)
      )
    }
  },

  render: ({ send, state }) =>
    <div className=(Styles.container(~preventScroll=state.showHelp) |> TypedGlamor.toString)>
      <Toolbar onRunAll     = {() => send(RunAll)}
               onAdd        = {() => updateStore(Store.AddTest)}
               onClear      = {() => updateStore(Store.Clear)}
               onHelp       = {() => send(ShowHelp)}
               shareableUrl = url />

      <div className="scroll-container">
        <WidthContainer>
          <SetupBlock code      = data.current.setup
                      onChange  = {code => updateStore(Store.UpdateSetup(code))} />

          <Control.MapList items=(data.current.tests |> List.reverse)>
            ...(test =>
              <TestBlock
                  key       = (test.data.id |> Test.Id.toString)
                  onChange  = {changed => updateStore(Store.UpdateTestData(changed))}
                  onRun     = {() => send(RunSingle(test.data))}
                  onRemove  = {() => updateStore(Store.RemoveTest(test.data.id))}
                  onLanguageChange
                            = {language => updateStore(Store.UpdateTestData({ ...test.data, language }))}
                  data      = test.data
                  setup     = data.current.setup
                  state     = test.state 
              />
            )
          </Control.MapList>

          {
            <Control.IfSome option=data.undo>
              ...(((description, state)) =>
                <Button icon      = "undo"
                        label     = ("Undo " ++ description)
                        style     = `Dark
                        className = "undo-button"
                        onClick   = (() => updateStore(Store.Undo(state))) />)
            </Control.IfSome>
          }

        </WidthContainer>

        <footer>
          <WidthContainer>
            <section>
              <h1> ("Project" |> text) </h1>
              <ul>
                <li> <a href="https://github.com/rebench/rebench.github.io"> ("Source Code Repository" |> text) </a> </li>
                <li> <a href="https://github.com/rebench/rebench.github.io/issues"> ("Support / Bug Tracker" |> text) </a> </li>
              </ul>
            </section>

            <section>
              <h1> ("Made with" |> text) </h1>
              <ul>
                <li> <a href="https://github.com/bucklescript/bucklescript"> ("BuckleScript" |> text) </a> </li>
                <li> <a href="https://benchmarkjs.com/"> ("Benchmark.js" |> text) </a> </li>
                <li> <a href="https://codemirror.net/"> ("CodeMirror" |> text) </a> </li>
                <li> <a href="https://reasonml.github.io/reason-react/"> ("ReasonReact" |> text) </a> </li>
                <li> <a href="https://github.com/threepointone/glamor"> ("glamor" |> text) </a> </li>
              </ul>
            </section>

            <section>
              <h1> ("Reason" |> text) </h1>
              <ul>
                <li> <a href="https://reasonml.github.io/guide"> ("Reason Guide" |> text) </a> </li>
                <li> <a href="https://reasonml.github.io/try"> ("Reason Playground" |> text) </a> </li>
              </ul>
            </section>
          </WidthContainer>
        </footer>
      </div>

      <Control.If cond=state.showHelp>
        ...(() => 
          <div className  = "mask"
               onClick    = (e => ReactEventRe.Mouse.(target(e) === currentTarget(e)) ? send(HideHelp) : ())>
            <HelpModal onClose=(() => send(HideHelp))/>
          </div>)
      </Control.If>
    </div>
};
