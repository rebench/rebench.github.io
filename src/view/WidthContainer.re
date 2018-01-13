
let style = TypedGlamor.(css([
  width(pct(100.)),
  maxWidth(px(1012)),
  minWidth(px(600)),
  margin2(~v=zero, ~h=auto)
]));

let component = ReasonReact.statelessComponent("WidthContainer");
let make = children => {
  ...component,

  render: _self =>
    ReasonReact.createDomElement(
      "div",
      ~props={"className": style},
      children
    )
}