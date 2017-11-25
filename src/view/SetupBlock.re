open! Rebase;
open! Helpers;

let component = ReasonReact.statelessComponent("SetupBlock");
let make = (~code, ~onChange, _children) => {
  ...component,

  render: (_) =>
    <Block_ header=`Text("Setup") collapsible=true>
      <Editor value=code lang=`RE onChange />
    </Block_>
};