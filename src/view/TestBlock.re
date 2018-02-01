open! Rebase;
open! Vrroom;
module Styles = TestBlockStyles;
open! Test;

type state = {
  showOutput: bool
};

type action =
  | ToggleOutput
;

let formatResult = ({ hz, rme, sampleCount }) => {
  let hz      = hz |> Js.Float.toFixedWithPrecision(~digits=hz < 100. ? 2 : 0)
                   |> Utils.formatNumber;
  let rme     = rme |> Js.Float.toFixedWithPrecision(~digits=2);
  let plural  = sampleCount > 1 ? "s" : "";

  {j|$hz ops/sec \xb1$rme% ($sampleCount run$plural sampled)|j} 
};

let formatRelativeScore = score =>
  score == 0. ? "Fastest" : (Js.Float.toFixed(-.score) ++ "% slower");

let getStateClass =
  fun | Untested                            => "s-untested"
      | Running(_)                          => "s-running"
      | Error(_)                            => "s-error"
      | Complete(_, Some(s)) when s == 0.   => "s-complete s-fastest"
      | Complete(_, Some(s)) when s >= -10. => "s-complete s-close"
      | Complete(_, Some(s)) when s <= -50. => "s-complete s-not-even-close"
      | Complete(_)                         => "s-complete";

module LanguageSelectButton = SelectButton.Make({
  type value = Language.t;
});

let languageMenuItems =
  [`RE, `ML, `JS] |> List.map(lang =>
    LanguageSelectButton.{
      label: lang |> Language.name,
      value: lang
    });

let getError =
  fun | Compiler.Ok(_)
      | Compiler.Warning(_, _) => None
      | Error(error, _)        => Some(error);

let getMarks =
  fun | Compiler.Ok(_)
      | Compiler.Warning(_, _) => []
      | Error(_, marks)        => marks;


module TestCompiler = Debounce.Make({
  type input = (string, Test.t);
  type output = Compiler.result;
  let compute = ((setup, test)) =>
    Compiler.compileTest(setup, test);
});

let component = ReasonReact.reducerComponent("TestBlock");
let make = (~setup, ~data: Test.t, ~state as testState, ~onChange, ~onRun, ~onRemove, ~onLanguageChange, _:childless) => {

  let renderRelativeScore = () =>
    switch testState {
    | Complete(_, Some(score)) =>
      <span>
        (" - " |> text)
        <span className="score">
          {score |> formatRelativeScore |> text}
        </span>
      </span>
    | _ => nothing
    };

  let renderResult = () =>
    switch testState {
    | Untested => nothing

    | Running(result) =>
      <Vrroom.Fragment>
        <Icon name="history" />
        {result |> formatResult |> text}
      </Vrroom.Fragment>

    | Error(error) =>
      <Vrroom.Fragment>
        <Icon name="alert-circle-outline" />
        (error |> text)
      </Vrroom.Fragment>

    | Complete(result, _) =>
      <Vrroom.Fragment>
        <Icon name="check" />
        {result |> formatResult |> text}
      </Vrroom.Fragment>
    };

  let renderHeader = ({ ReasonReact.send, state }) =>
    <Vrroom.Fragment>
      <div className="box">
        <LanguageSelectButton
            className         = "language-button"
            selected          = data.language
            onSelect          = onLanguageChange
            items             = languageMenuItems
            renderButtonLabel = (item => item.value |> Language.abbreviation
                                                    |> text) /> 
      </div>

      <div className="title">
        ("test" |> text)
        (renderRelativeScore())
      </div>

      <div className="box right">
        <Button label     = "output"
                icon      = (state.showOutput ? "chevron-up" : "chevron-down")
                alignIcon = `Right
                onClick   = {() => send(ToggleOutput)} />
      </div>
    </Vrroom.Fragment>;

  let renderFooter = () =>
    <Vrroom.Fragment>
      <Button icon    = "chevron-right"
              label   = "Run"
              onClick = onRun />

      <Button icon    = "close"
              label   = "Remove"
              onClick = onRemove />

      <div className="state">
        {renderResult()}
      </div>
    </Vrroom.Fragment>;

  {
    ...component,

    initialState: () => { showOutput: false },
    reducer: (ToggleOutput, state) => 
      ReasonReact.Update({ showOutput: !state.showOutput }),

    render: ({ state } as self) =>
      <TestCompiler input=(setup, data) wait=300>
        ...(compilerResult =>
          <Block_ className = (Styles.container(~testState, ~language=data.language) |> TypedGlamor.toString)
                  header    = `Element(renderHeader(self))
                  footer    = renderFooter()
                  error     = ?getError(compilerResult) >

            <Editor value     = data.code
                    lang      = data.language
                    onChange  = (code => onChange({ ...data, code }))
                    marks     = getMarks(compilerResult) />

            <Control.If cond=state.showOutput>
              ...(() =>
                switch compilerResult {
                | Compiler.Ok(code)
                | Compiler.Warning(code, _) =>
                  <Editor value=code lang=`JS readOnly=true />

                | Error(message, _) =>
                  <div> (message |> text) </div>
                }
              )
            </Control.If>
          </Block_>
        )
      </TestCompiler>
  }
};