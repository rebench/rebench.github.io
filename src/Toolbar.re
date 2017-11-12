let text = ReasonReact.stringToElement;

let component = ReasonReact.statelessComponent("Toolbar");
let make = (~onButtonClick, _) => {
  ...component,
  render: (_) =>
    <div>
      <button onClick=((_) => onButtonClick(`RunAll))> (text("Run All")) </button>
      <button onClick=((_) => onButtonClick(`Add))> (text("Add")) </button>
    </div>
};
