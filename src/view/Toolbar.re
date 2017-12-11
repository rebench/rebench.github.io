open! Helpers;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onRunAll, ~onAdd, ~onClear, ~shareableUrl as url, _) => {
  ...component,
  render: _self =>
    <div className=Styles.root>
      <WidthContainer>

        <img className="logo" src="static/logo.svg" title="re:bench" alt="re:bench" />

        <Button icon    = "chevron-right"
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

      </WidthContainer>
    </div>
};
