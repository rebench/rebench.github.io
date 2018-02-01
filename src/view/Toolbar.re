open! Vrroom;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onRunAll, ~onAdd, ~onClear, ~onHelp, ~shareableUrl as url, _:childless) => {
  ...component,
  render: _self =>
    <div className=(Styles.container |> TypedGlamor.toString)>
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

        <div className="separator" />

        <ShareButton url />

        <Button icon    = "help-circle-outline"
                label   = "Help"
                onClick = onHelp />

      </WidthContainer>
    </div>
};
