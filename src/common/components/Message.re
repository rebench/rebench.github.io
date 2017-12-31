open! Rebase;
open Helpers;
module Styles = MessageStyles;

let component = ReasonReact.statelessComponent("Error");
let make = (~type_, ~message, _children) => {
  ...component,

  render: _self => {
    let style = 
      switch type_ {
      | `Error    => Styles.error
      | `Warning  => Styles.warning
      };

    <div className=style>
      (message |> text)
    </div>
  }
};