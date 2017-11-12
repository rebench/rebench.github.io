open Rebase;
module Styles = TestCaseStyles;

let text = ReasonReact.stringToElement;

type t = {
  id: string,
  code: string
};

type result = {
  hz: float,
  rme: float,
  sampleCount: int,
};

type state =
  | Virgin
  | Running(result)
  | Complete(result);

let make: int => t = (id) => {
  id: {j|__testCase$(id)__|j},
  code: switch id {
  | 1 => "string_of_int(42)"
  | 2 => "Js.String.make(42)"
  | _ => "/* put stuff here */"
  }
};

module View = {

  let formatResult = ({hz, rme, sampleCount}) => {
    let hz = hz |> Js.Float.toFixedWithPrecision(~digits=hz < 100. ? 2 : 0)
                |> Utils.formatNumber;
    let rme = rme |> Js.Float.toFixedWithPrecision(~digits=2);
    let plural = sampleCount > 1 ? "s" : "";
    {j|$hz ops/sec \xb1$rme% ($sampleCount run$plural sampled)|j} 
  };

  let component = ReasonReact.statelessComponent("TestCase");
  let make = (~data, ~state, ~onChange, ~onRun, ~onRemove, _children) => {
    ...component,

    render: (_) =>
      <div className=Styles.root>
        <Editor value=data.code lang=`RE onChange=((code) => onChange({ ...data, code })) />
        <div className=Styles.footer>

          <button onClick=((_) => onRun())>
            <Icon name="play" />
            (text("Run"))
          </button>

          <button onClick=((_) => onRemove())>
            <Icon name="close" />
            (text("Remove"))
          </button>

          (
            switch state {
            | Virgin =>
              <div className=(Styles.state ++ " s-virgin")>
                <Icon name="minus" />
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
};