open! Rebase;
open Vrroom.Helpers;

let component = ReasonReact.statelessComponent("Error");
let make = (~kind, ~message, _children) => {
  ...component,

  render: _self =>
    <div className=(MessageStyles.container(~kind) |> TypedGlamor.toString)>
      (message |> text)
    </div>
};