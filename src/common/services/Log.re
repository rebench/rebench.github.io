let component = ReasonReact.statelessComponent("Log");
let make = (~data, _) => {
  ...component,
  didUpdate: (_) => Js.log(data),
  render: (_) => ReasonReact.nullElement
}