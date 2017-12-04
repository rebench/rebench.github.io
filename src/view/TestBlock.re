open! Rebase;
open! Helpers;
module Styles = TestBlockStyles;
open Test;

type state = {
  showOutput: bool
};

type action =
  | ToggleOutput
;

let formatResult = ({hz, rme, sampleCount}) => {
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

let makeClassName = (state) => classNames([
    (Styles.root, true),
    (getStateClass(state), true)
  ]);

module LanguageSelectButton = SelectButton.Make({
  type value = Language.t;
});

let languageMenuItems =
  [`RE, `ML, `JS] |> List.map(lang =>
    LanguageSelectButton.{
      label: lang |> Language.name,
      value: lang
    });

let getLanguageButtonClassName =
  fun | `RE => "m-language-reason"
      | `ML => "m-language-ocaml"
      | `JS => "m-language-javascript";

let getError =
  fun | Compiler.Ok(_)
      | Compiler.Warning(_, _) => None
      | Error(error, _)        => Some(error);

let getMarks =
  fun | Compiler.Ok(_)
      | Compiler.Warning(_, _) => []
      | Error(_, marks) => marks;


module TestCompiler = Debounce.Make({
  type input = (string, Test.t);
  type output = Compiler.result;
  let compute = ((setup, test)) =>
    Compiler.compileTest(setup, test);
});

let component = ReasonReact.reducerComponent("TestBlock");
let make = (~setup, ~data: Test.t, ~state as testState, ~onChange, ~onRun, ~onRemove, ~onLanguageChange, _children) => {

  let renderRelativeScore = () =>
    switch testState {
    | Complete(_, Some(score)) =>
      <span>
        (" - " |> text)
        <span className="score">
          (
            score |> formatRelativeScore
                  |> text
          )
        </span>
      </span>
    | _ => ReasonReact.nullElement
    };

  let renderResult = () =>
    switch testState {
    
    | Untested =>
      <div className=(Styles.state ++ " s-untested") />

    | Running(result) =>
      <div className=(Styles.state ++ " s-running")>
        <Icon name="history" />
        (
          result |> formatResult
                 |> text
        )
      </div>

    | Error(error) =>
      <div className=(Styles.state ++ " s-error")>
        <Icon name="alert-circle-outline" />
        (error |> text)
      </div>

    | Complete(result, _) =>
      <div className=(Styles.state ++ " s-complete")>
        <Icon name="check" />
        (
          result |> formatResult
                 |> text
        )
      </div>

    };

  let renderHeader = ({ ReasonReact.reduce, state }) =>
    <div className=Styles.header>

      <div className="box">
        <LanguageSelectButton
            className         = getLanguageButtonClassName(data.language)
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
                onClick   = reduce(() => ToggleOutput) />
      </div>

    </div>;

  let renderFooter = () => [|
    <Button icon    = "chevron-right"
            label   = "Run"
            onClick = onRun />,

    <Button icon    = "close"
            label   = "Remove"
            onClick = onRemove />,

    renderResult()
  |];

  {
    ...component,

    initialState: () => { showOutput: false },
    reducer: (action, state) => 
      switch action {
      | ToggleOutput =>
        ReasonReact.Update({ showOutput: !state.showOutput })
      },

    render: ({ state } as self) =>
      <TestCompiler input=(setup, data) wait=300>
        ...(compilerResult =>
          <Block_ className = makeClassName(testState)
                  header    = `Element(renderHeader(self))
                  footer    = renderFooter()
                  error     = ?getError(compilerResult) >

            <Editor value     = data.code
                    lang      = data.language
                    onChange  = (code => onChange({ ...data, code }))
                    marks     = getMarks(compilerResult) />

            (
              if (state.showOutput) {
                switch compilerResult {
                | Compiler.Ok(code)
                | Compiler.Warning(code, _) =>
                  <Editor value=code lang=`JS readOnly=true />

                | Error(message, _) =>
                  <div> (message |> text) </div>
                }
              } else {
                ReasonReact.nullElement
              }
            )

          </Block_>
        )
      </TestCompiler>
  }
};