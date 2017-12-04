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

let renderFooter = 
  fun | Some(elements) =>
        <footer className=Styles.footer>
          (elements |> ReasonReact.arrayToElement)
        </footer>
      | None => ReasonReact.nullElement;

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

      <header onClick=reduce((_) => HeaderClicked)>
        (renderHeader(header))
      </header>

      <main>
        (children |> ReasonReact.arrayToElement)
      </main>

      (
        switch error {
        | Some(error) => <Message message=error type_=`Error />
        | None => ReasonReact.nullElement
        }
      )

      (renderFooter(footer))

    </section>
};
