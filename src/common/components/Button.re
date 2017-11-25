open Helpers;

module Styles = ButtonStyles;

let makeClassName =
  fun | `Normal => Styles.normal
      | `Dark   => Styles.dark;

let makeIcon =
  fun | Some(name) => <Icon name />
      | None       => ReasonReact.nullElement;

let component = ReasonReact.statelessComponent("Button");
let make = (~label, ~icon=?, ~style=`Normal, ~onClick, _) => {
  ...component,
  render: (_) =>
    <button className = makeClassName(style)
            onClick   = ((_) => onClick()) >
      (makeIcon(icon))
      (label |> text)
    </button>
};