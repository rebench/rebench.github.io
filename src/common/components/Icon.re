let component = ReasonReact.statelessComponent("Icon");
let make = (~name, _) => {
  ...component,
  render: (_) =>
    <span className={j|mdi mdi-$name|j} />
};