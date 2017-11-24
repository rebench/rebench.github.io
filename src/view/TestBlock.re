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
  let hz = hz |> Js.Float.toFixedWithPrecision(~digits=hz < 100. ? 2 : 0)
              |> Utils.formatNumber;
  let rme = rme |> Js.Float.toFixedWithPrecision(~digits=2);
  let plural = sampleCount > 1 ? "s" : "";

  {j|$hz ops/sec \xb1$rme% ($sampleCount run$plural sampled)|j} 
};

let formatRelativeScore = score =>
  score == 0. ? "Fastest" : (Js.Float.toFixed(-.score) ++ "% slower");

let getStateClass =
  fun | Untested => " s-untested"
      | Running(_) => " s-running"
      | Complete(_, Some(s)) when s == 0. => " s-complete s-fastest"
      | Complete(_, Some(s)) when s >= -10. => " s-complete s-close"
      | Complete(_, Some(s)) when s <= -50. => " s-complete s-not-even-close"
      | Complete(_) => " s-complete";

let renderHeader = state => [|
  ("Test" |> text),
  (
    switch state {
    | Complete(_, Some(score)) =>
      <span>
        (" - " |> text)
        <span className="score">
          (score |> formatRelativeScore
                  |> text)
        </span>
      </span>
    | _ => ReasonReact.nullElement
    }
  )
|];

let renderFooter = (state, onRun, onRemove) => [|
  <Button icon="play"
          label="Run"
          onClick=(() => onRun()) />,

  <Button icon="close"
          label="Remove"
          onClick=(() => onRemove()) />,
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

let component = ReasonReact.statelessComponent("TestBlock");
let make = (~data: Test.t, ~state, ~onChange, ~onRun, ~onRemove, _children) => {
  ...component,

  render: (_) =>
    <Block_ className=(Styles.root ++ getStateClass(state))
           header=`Elements(renderHeader(state))
           footer=renderFooter(state, onRun, onRemove) >

      <Editor value=data.code
              lang=`RE
              onChange=(code => onChange({ ...data, code })) />

    </Block_>
};