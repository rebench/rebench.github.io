open Vrroom.Helpers;
module Control = Vrroom.Control;

type state = {
  collapsed: bool
};

type action =
  | HeaderClicked
;

let renderHeaderContent =
  fun | `Text(str)        => <div className="textHeader"> {str |> text} </div>
      | `Element(element) => element;

let component = ReasonReact.reducerComponent("Block");
let make = (~header,
            ~footer=?,
            ~className=?,
            ~error=?,
            ~collapsible as isCollapsible=false,
            children) => {
  ...component,

  initialState: () => { collapsed: false },

  reducer: (action, state) =>
    switch action {
    | HeaderClicked =>
      isCollapsible ?
        ReasonReact.Update({ collapsed: !state.collapsed }) :
        ReasonReact.NoUpdate
    },

  render: ({ send, state }) =>
    <section className=ClassName.join([
      BlockStyles.container(~isCollapsible, ~isCollapsed=state.collapsed) |> Js.String.make,
      className |> ClassName.fromOption
    ])>
      <header onClick={_e => send(HeaderClicked)}>
        {renderHeaderContent(header)}
      </header>

      {ReasonReact.createDomElement("main", ~props=Js.Obj.empty(), children)}

      <Control.IfSome option=error>
        ...(error => <Message message=error kind=`Error />)
      </Control.IfSome>

      <Control.IfSome option=footer>
        ...(content =>
          <footer>
            content
          </footer>
        )
      </Control.IfSome>
    </section>
};
