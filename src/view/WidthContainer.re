
let widthContainer = Glamor.(css([
  width("100%"),
  maxWidth("1012px"),
  minWidth("600px"),
  margin("0 auto")
]));

let component = ReasonReact.statelessComponent("WidthContainer");
let make = children => {
  ...component,

  render: _self =>
    ReasonReact.createDomElement(
      "div",
      ~props={"className": widthContainer},
      children
    )
}