open! Rebase;
open Helpers;
module Styles = SetupBlockStyles;

let component = ReasonReact.statelessComponent("SetupBlock");
let make = (~code, ~onChange, _children) => {
  ...component,

  render: (_) =>
    <div className=Styles.root>
      <div className=Styles.header>
        ("Setup" |> text)
      </div>
      <Editor value=code lang=`RE onChange=(code => onChange(code)) />
    </div>
};