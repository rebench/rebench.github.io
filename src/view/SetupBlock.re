open! Rebase;
open! Helpers;

let component = ReasonReact.statelessComponent("SetupBlock");
let make = (~code, ~onChange, _children) => {
  ...component,

  render: (_) =>
    <Block_ header=`Text("Setup")>
      <Editor value=code lang=`RE onChange=(code => onChange(code)) />
    </Block_>
};