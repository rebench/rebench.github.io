open! Helpers;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onRunAll, ~onAdd, ~onClear, ~shareableUrl as url, _) => {
  ...component,
  render: (_) =>
    <div className=Styles.root>

      <Button icon    = "play"
              label   = "Run All"
              onClick = onRunAll />
      
      <Button icon    = "plus"
              label   = "Add"
              onClick = onAdd />

      <Button icon    = "close"
              label   = "Clear"
              onClick = onClear />

      <div className=Styles.separator />

      <ShareButton url />
    </div>
};
