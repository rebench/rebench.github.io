open! Rebase;
open! Helpers;
module Styles = TestCaseStyles;
open Model.Test;

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
  fun | Untested => " s-virgin"
      | Running(_) => " s-running"
      | Complete({ relativeScore: Some(s) }) when s == 0. => " s-complete s-fastest"
      | Complete({ relativeScore: Some(s) }) when s >= -10. => " s-complete s-close"
      | Complete({ relativeScore: Some(s) }) when s <= -50. => " s-complete s-not-even-close"
      | Complete(_) => " s-complete";

let component = ReasonReact.statelessComponent("TestCase");
let make = (~data: Model.Test.t, ~state, ~onChange, ~onRun, ~onRemove, _children) => {
  ...component,

  render: (_) =>
    <div className=(Styles.root ++ getStateClass(state))>
      <div className=Styles.header>
        ("Test Case" |> text)
        (
          switch state {
          | Complete({ relativeScore: Some(score) }) =>
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
      </div>

      <Editor value=data.code
              lang=`RE
              onChange=(code => onChange({ ...data, code })) />

      <div className=Styles.footer>

        <button onClick=((_) => onRun())>
          <Icon name="play" />
          ("Run" |> text)
        </button>

        <button onClick=((_) => onRemove())>
          <Icon name="close" />
          ("Remove" |> text)
        </button>

        (
          switch state {
          | Untested =>
            <div className=(Styles.state ++ " s-virgin")>
            </div>

          | Running(result) =>
            <div className=(Styles.state ++ " s-running")>
              <Icon name="history" />
              (
                result |> formatResult
                       |> text
              )
            </div>

          | Complete(result) =>
            <div className=(Styles.state ++ " s-complete")>
              <Icon name="check" />
              (
                result |> formatResult
                       |> text
              )
            </div>
          }
        )
      </div>
    </div>
};