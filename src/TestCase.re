open Rebase;

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
  let make = (~data, ~result, ~onChange, ~onRemove, _children) => {
    ...component,

    render: (_) =>
      <div>
        <Editor value=data.code lang=`ML onChange=((code) => onChange({ ...data, code })) />
        <div>
          <button onClick=((_) => onRemove())> (text("Run")) </button>
          <button onClick=((_) => onRemove())> (text("Remove")) </button>
          <div> (text(Option.mapOr(formatResult, "No result yet", result))) </div>
        </div>
      </div>
  };
};