open Helpers;
module Styles = ToolbarStyles;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onButtonClick, _) => {
  ...component,
  render: (_) =>
    <div className=Styles.root>

      <button className=Styles.button
              onClick=((_) => onButtonClick(`RunAll))>
        <Icon name="play" />
        ("Run All" |> text)
      </button>
      
      <button className=Styles.button
              onClick=((_) => onButtonClick(`Add))>
        <Icon name="plus" />
        ("Add" |> text)
      </button>

      <button className=Styles.button
              onClick=((_) => onButtonClick(`Clear))>
        <Icon name="close" />
        ("Clear" |> text)
      </button>

    </div>
};
