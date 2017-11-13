open Rebase;
module Styles = JSBlockStyles;

let text = ReasonReact.stringToElement;

let component = ReasonReact.statelessComponent("TestCase");
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