open Rebase;
open Helpers;

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
let make = (~url, _) => {
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
        self => {
          state.inputRef^ |> Option.forEach(input => {
            selectAll(input);
            execCommand("copy");
          });
          Js.Global.setTimeout(self.reduce(() => Timeout), 2000) |> ignore
        }
      )

    | Timeout =>
      ReasonReact.Update({ ...state, showConfirmation: false })
    },

  render: ({ reduce, handle, state }) =>
    <div className=(Styles.root ++ (state.showConfirmation ? " s-show-confirmation" : ""))>

      <input value    = url
             ref      = handle((r, { state }) => state.inputRef := Js.Nullable.to_opt(r))
             readOnly = Js.true_ />

      <Button icon      = "share"
              label     = "Share"
              onClick   = reduce((_) => Clicked) />

      <span className="tooltip">
        <span className="arrow" />
        <span className="message"> ("Click to copy to clipboard" |> text) </span>
        <span className="confirmation-message"> ("Copied" |> text) </span>
      </span>

    </div>
};