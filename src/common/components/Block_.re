open Helpers;

module Styles = BlockStyles;

type state = {
  collapsed: bool
};

type action =
  | HeaderClicked
;

let renderHeader =
  fun | `Text(str)        => <div className=Styles.textHeader> (str |> text) </div>
      | `Element(element) => element;

let makeClassName = (~className="", collapsible, state) =>
  classNames([
    (Styles.root, true),
    (className, true),
    ("collapsible", collapsible),
    ("s-collapsed", state.collapsed)
  ]);

let component = ReasonReact.reducerComponent("Block");
let make = (~header, ~footer=?, ~className=?, ~error=?, ~collapsible=false, children) => {
  ...component,

  initialState: () => { collapsed: false },

  reducer: (action, state) =>
    switch action {
    | HeaderClicked =>
      collapsible ?
        ReasonReact.Update({ collapsed: !state.collapsed }) :
        ReasonReact.NoUpdate
    },

  render: ({ reduce, state }) =>
    <section className=makeClassName(~className?, collapsible, state)>

      <header onClick=reduce(_e => HeaderClicked)>
        (renderHeader(header))
      </header>

      {ReasonReact.createDomElement("main", ~props=Js.Obj.empty(), children)}

      <Control.IfSome option=error>
        ...(error => <Message message=error type_=`Error />)
      </Control.IfSome>

      <Control.IfSome option=footer>
        ...(elements =>
          ReasonReact.createDomElement(
            "footer",
            ~props={ "className": Styles.footer },
            elements
        ))
      </Control.IfSome>
    </section>
};
