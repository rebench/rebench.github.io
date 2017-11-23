open! Rebase;
open Helpers;
module Styles = JSBlockStyles;

let component = ReasonReact.statelessComponent("JSBlock");
let make = (~code, _children) => {
  ...component,

  render: (_) => {
    <div className=Styles.root>
      <div className=Styles.header>
        ("Generated JavaScript" |> text)
      </div>
      <Editor value=code lang=`JS readOnly=true />
    </div>
  }
};