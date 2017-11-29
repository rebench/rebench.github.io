open! Rebase;
open! Helpers;
module Styles = TestBlockStyles;
open Test;
/*
module Button = { 
  let make = Button.make(~style=`Dark) 
};
*/

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
  type value = Test.language;
});

let languageMenuItems =
  [`RE, `JS] |> List.map(lang =>
    LanguageSelectButton.{
      label: lang |> fun | `RE => "Reason"
                         | `JS => "JavaScript",
      value: lang
    });

let getLanguageButtonClassName =
  fun | `RE => "m-language-reason"
      | `JS => "m-language-javascript";



let component = ReasonReact.statelessComponent("TestBlock");
let make = (~data: Test.t, ~state, ~onChange, ~onRun, ~onRemove, ~onLanguageChange, _children) => {

  let renderHeader = () => [|
    ("Test" |> text),
    (
      switch state {
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
      }
    )
  |];

  let renderFooter = () => [|
    <LanguageSelectButton className = getLanguageButtonClassName(data.language)
                          selected  = data.language
                          onSelect  = onLanguageChange
                          items     = languageMenuItems />,

    <Button icon    = "play"
            label   = "Run"
            onClick = onRun />,

    <Button icon    = "close"
            label   = "Remove"
            onClick = onRemove />,

    (
      switch state {
      
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

      }
    )
  |];

  {
    ...component,

    render: (_) =>
      <SyntaxChecker input=(data.language, data.code) wait=100>
        ...(((isError, marks)) =>

          <Block_ className = makeClassName(state, isError)
                  header    = `Elements(renderHeader())
                  footer    = renderFooter() >

            <Editor value     = data.code
                    lang      = data.language
                    onChange  = (code => onChange({ ...data, code }))
                    marks     />

          </Block_>)
      </SyntaxChecker>
  }
};