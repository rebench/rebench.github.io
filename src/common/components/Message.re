open! Rebase;
open Vrroom;

let component = ReasonReact.statelessComponent("Error");
let make = (~kind, ~message, _:childless) => {
  ...component,

  render: _self =>
    <div className=(MessageStyles.container(~kind) |> TypedGlamor.toString)>
      (message |> text)
    </div>
};