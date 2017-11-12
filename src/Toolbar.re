module Styles = ToolbarStyles;

let text = ReasonReact.stringToElement;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onButtonClick, _) => {
  ...component,
  render: (_) =>
    <div className=Styles.root>

      <button className=Styles.button
              onClick=((_) => onButtonClick(`RunAll))>
        <Icon name="play" />
        (text("Run All"))
      </button>
      
      <button className=Styles.button
              onClick=((_) => onButtonClick(`Add))>
        <Icon name="plus" />
        (text("Add"))
      </button>
    </div>
};
