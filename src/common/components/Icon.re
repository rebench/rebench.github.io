open Vrroom;

let component = ReasonReact.statelessComponent("Icon");
let make = (~name, _:childless) => {
  ...component,
  render: _self =>
    <span className={j|mdi mdi-$name|j} />
};