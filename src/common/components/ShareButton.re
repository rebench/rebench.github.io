open Rebase;
open Vrroom;

[@bs.val] external execCommand : string => unit = "document.execCommand";
[@bs.send] external selectAll : Dom.element => unit = "select";

module Styles = ShareButtonStyles;

type state = {
  showConfirmation: bool,
  inputRef: ref(option(Dom.element))
};

type action =
  | Clicked
  | Timeout;

let component = ReasonReact.reducerComponent("ShareButton");
let make = (~url, _:childless) => {
  ...component,

  initialState: () => {
    showConfirmation: false,
    inputRef: ref(None)
  },

  reducer: (action, state) => 
    switch action {
    | Clicked =>
      ReasonReact.UpdateWithSideEffects(
        { ...state, showConfirmation: true },
        ({ send }) => {
          state.inputRef^ |> Option.forEach(input => {
            selectAll(input);
            execCommand("copy");
          });
          Js.Global.setTimeout(() => send(Timeout), 2000) |> ignore
        }
      )

    | Timeout =>
      ReasonReact.Update({ ...state, showConfirmation: false })
    },

  render: ({ send, handle, state }) =>
    <div className=(Styles.container(~showConfirmation=state.showConfirmation) |> TypedGlamor.toString)>

      <input value    = url
             ref      = handle((r, { state }) => state.inputRef := Js.toOption(r))
             readOnly = true />

      <Button icon      = "share"
              label     = "Share"
              onClick   = {_e => send(Clicked)} />

      <span className="tooltip">
        <span className="message"> ("Click to copy to clipboard" |> text) </span>
        <span className="confirmation-message"> ("Copied" |> text) </span>
      </span>

    </div>
};