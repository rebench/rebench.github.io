open! Rebase;
open! Vrroom;

[@bs.val] external addEventListener : string => (Dom.event => unit) => unit = "document.addEventListener";
[@bs.val] external removeEventListener : string => (Dom.event => unit) => unit = "document.removeEventListener";
/*external asNode : Dom.eventTarget => Dom.node = "%identity";*/
[@bs.get] external target : Dom.event => Dom.node = "";
[@bs.send.pipe: Dom.node] external contains : Dom.node_like('a) => bool = "";

type state = {
  rootRef: ref(option(Dom.element))
};

let component = ReasonReact.reducerComponent("OnClickOutside");
let make = (~onClick, /*~enabled=true,*/ children) => {
  ...component,

  initialState: () => {
    rootRef: ref(None)
  },
  reducer: ((), _state) => ReasonReact.NoUpdate,

  subscriptions: self => [
    Sub(
      () => {
        let listener = event =>
          self.state.rootRef^ |> Option.forEach(rootEl =>
            if (event |> target |> contains(rootEl)) {
              onClick();
            }
          );
        addEventListener("mousedown", listener);
        listener
      },
      removeEventListener("mousedown")
    )
  ],

  render: ({ handle }) =>
    ReasonReact.createDomElement(
      "div",
      ~props={
        "ref": handle((r, { state }) => state.rootRef := Js.toOption(r))
      },
      children
    )
}