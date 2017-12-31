open! Rebase;
open! Helpers;

[@bs.val] external addEventListener : string => (Dom.event => unit) => unit = "document.addEventListener";
[@bs.val] external removeEventListener : string => (Dom.event => unit) => unit = "document.removeEventListener";
/*external asNode : Dom.eventTarget => Dom.node = "%identity";*/
[@bs.get] external target : Dom.event => Dom.node = "";
[@bs.send.pipe: Dom.node] external contains : Dom.node_like('a) => bool = "";

type state = {
  rootRef: ref(option(Dom.element)),
  listener: ref(option(Dom.event => unit))
};

let component = ReasonReact.reducerComponent("OnClickOutside");
let make = (~onClick, /*~enabled=true,*/ children) => {
  ...component,

  initialState: () => {
    rootRef: ref(None),
    listener: ref(None)
  },
  reducer: ((), _state) => ReasonReact.NoUpdate,

  didMount: self => {
    let listener = event =>
      self.state.rootRef^ |> Option.forEach(rootEl =>
        if (event |> target |> contains(rootEl)) {
          onClick();
        }
      );
    self.state.listener := Some(listener);
    addEventListener("mousedown", listener);
    ReasonReact.NoUpdate
  },
  /*didUpdate: ([oldSelf, newSelf]) =>,*/
  willUnmount: self => {
    self.state.listener^ |> Option.forEach(addEventListener("mousedown"));
  },

  render: ({ handle }) =>
    <div ref=handle((r, { state }) => state.rootRef := Js.toOption(r))>
      (children |> ReasonReact.arrayToElement)
    </div>
}