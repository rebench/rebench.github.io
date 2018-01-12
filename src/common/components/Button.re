open Vrroom.Helpers;
module Styles = ButtonStyles;

let makeIcon =
  fun | Some(name) => <Icon name />
      | None       => null;

let component = ReasonReact.statelessComponent("Button");
let make = (~label,
            ~icon=?,
            ~alignIcon=`Left,
            ~className="",
            ~onClick, _) => {
  ...component,

  render: _self =>
    <button className = ClassName.(join([
                          Styles.normal |> Js.String.make,
                          className,
                          "m-icon-left" |> if_(alignIcon === `Left),
                          "m-icon-right" |> if_(alignIcon === `Right)
                        ]))
            onClick   = (_e => onClick()) >

      (alignIcon === `Left ? makeIcon(icon) : null)
      (label |> text)
      (alignIcon === `Right ? makeIcon(icon) : null)

    </button>
};