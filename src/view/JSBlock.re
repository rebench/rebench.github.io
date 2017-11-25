open! Rebase;
open! Helpers;

let component = ReasonReact.statelessComponent("JSBlock");
let make = (~code, _children) => {
  ...component,

  render: (_) => {
    <Block_ header=`Text("Generated JavaScript") collapsible=true>
      <Editor value=code lang=`JS readOnly=true />
    </Block_>
  }
};