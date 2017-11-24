open Helpers;

module Styles = ButtonStyles;

let getStyle =
  fun | `Normal => Styles.normal
      | `Dark => Styles.dark;

let getIcon =
  fun | Some(name) => <Icon name />
      | None => ReasonReact.nullElement;

let component = ReasonReact.statelessComponent("Icon");
let make = (~label, ~icon=?, ~style=`Normal, ~onClick, _) => {
  ...component,
  render: (_) =>
    <button className=getStyle(style)
            onClick=((_) => onClick())>
      (getIcon(icon))
      (label |> text)
    </button>
};