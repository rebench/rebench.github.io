open Helpers;

module Styles = ButtonStyles;

let makeIcon =
  fun | Some(name) => <Icon name />
      | None       => ReasonReact.nullElement;

let component = ReasonReact.statelessComponent("Button");
let make = (~label,
            ~icon=?,
            ~alignIcon=`Left,
            ~className="",
            ~onClick, _) => {
  ...component,
  render: (_) =>
    <button className = classNames([
                          (Styles.normal, true),
                          (className, true),
                          ("m-icon-left", alignIcon === `Left),
                          ("m-icon-right", alignIcon === `Right)
                        ])
            onClick   = (_e => onClick()) >

      (alignIcon === `Left ? makeIcon(icon) : ReasonReact.nullElement)
      (label |> text)
      (alignIcon === `Right ? makeIcon(icon) : ReasonReact.nullElement)

    </button>
};