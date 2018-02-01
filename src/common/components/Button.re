open Vrroom;
module Styles = ButtonStyles;

let makeIcon =
  fun | Some(name) => <Icon name />
      | None       => nothing;

let component = ReasonReact.statelessComponent("Button");
let make = (~label,
            ~icon=?,
            ~style=`Normal,
            ~alignIcon=`Left,
            ~className="",
            ~onClick,
            _:childless) => {
  ...component,

  render: _self =>
    <button className = ClassName.join([Styles.root(style, alignIcon) |> TypedGlamor.toString, className])
            onClick   = (_e => onClick()) >

      (alignIcon === `Left ? makeIcon(icon) : nothing)
      (label |> text)
      (alignIcon === `Right ? makeIcon(icon) : nothing)

    </button>
};