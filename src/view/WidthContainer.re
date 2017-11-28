
let widthContainer = Glamor.(css([
  width("100%"),
  maxWidth("1012px"),
  minWidth("600px"),
  margin("0 auto")
]));

let component = ReasonReact.statelessComponent("WidthContainer");
let make = children => {
  ...component,
  render: (_) => {
    <div className=widthContainer>
      (ReasonReact.arrayToElement(children))
    </div>
  }
}