open Helpers;

module Styles = ButtonStyles;

let makeIcon =
  fun | Some(name) => <Icon name />
      | None       => ReasonReact.nullElement;

let component = ReasonReact.statelessComponent("Button");
let make = (~label, ~icon=?, ~className="", ~onClick, _) => {
  ...component,
  render: (_) =>
    <button className = classNames([(Styles.normal, true), (className, true)])
            onClick   = (_e => onClick()) >
      (makeIcon(icon))
      (label |> text)
    </button>
};