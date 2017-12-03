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
      | Complete(_, Some(s)) when s == 0.   => "s-complete s-fastest"
      | Complete(_, Some(s)) when s >= -10. => "s-complete s-close"
      | Complete(_, Some(s)) when s <= -50. => "s-complete s-not-even-close"
      | Complete(_)                         => "s-complete";

let makeClassName = (state, isError) => classNames([
    (Styles.root, true),
    (getStateClass(state), true),
    ("s-error", isError)
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
      <SyntaxChecker input=(data.language, data.code) wait=100>
        ...(((isError, marks)) =>
          <Block_ className = makeClassName(testState, isError)
                  header    = `Element(renderHeader(self))
                  footer    = renderFooter() >

            <Editor value     = data.code
                    lang      = data.language
                    onChange  = (code => onChange({ ...data, code }))
                    marks     />

            (
              if (state.showOutput) {
                <Compiler input=(setup, data) wait=300>
                  ...(compilerResult =>
                      switch compilerResult {
                      | Compiler.Ok(code)
                      | Compiler.Warning(code, _) =>
                        <Editor value=code lang=`JS readOnly=true />

                      | Error(message) =>
                        <div> (message |> text) </div>
                      }
                    )
                </Compiler>
              } else {
                ReasonReact.nullElement
              }
            )

          </Block_>
        )
      </SyntaxChecker>
  }
};