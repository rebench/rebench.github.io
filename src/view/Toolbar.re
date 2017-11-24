open! Helpers;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onButtonClick, ~shareableUrl, _) => {
  ...component,
  render: (_) =>
    <div className=Styles.root>

      <Button icon="play"
              label="Run All"
              onClick=(() => onButtonClick(`RunAll)) />
      
      <Button icon="plus"
              label="Add"
              onClick=(() => onButtonClick(`Add)) />

      <Button icon="close"
              label="Clear"
              onClick=(() => onButtonClick(`Clear)) />

      <div className=Styles.separator />

      <ShareButton url=shareableUrl />
    </div>
};
