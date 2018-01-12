open Vrroom.Helpers;
module Control = Vrroom.Control;
module Styles = BlockStyles;

type state = {
  collapsed: bool
};

type action =
  | HeaderClicked
;

let renderHeaderContent =
  fun | `Text(str)        => <div className=Styles.textHeader> {str |> text} </div>
      | `Element(element) => element;

let makeClassName = (~className="", collapsible, state) =>
  ClassName.(join([
    Styles.root |> Js.String.make,
    className,
    "collapsible" |> if_(collapsible),
    "s-collapsed" |> if_(state.collapsed)
  ]));

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
        {renderHeaderContent(header)}
      </header>

      {ReasonReact.createDomElement("main", ~props=Js.Obj.empty(), children)}

      <Control.IfSome option=error>
        ...(error => <Message message=error type_=`Error />)
      </Control.IfSome>

      <Control.IfSome option=footer>
        ...(content =>
          <footer className=Styles.footer>
            content
          </footer>
        )
      </Control.IfSome>
    </section>
};
