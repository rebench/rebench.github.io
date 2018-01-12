open Rebase;
open Vrroom.Helpers;
module Control = Vrroom.Control;
module Styles = SelectButtonStyles;

module type Config = {
  type value;
};

module Make(Config: Config) = {
  type item = {
    label: string,
    value: Config.value,
  };

  type state = {
    isOpen: bool
  };

  type action =
    | ButtonClicked
    | OutsideClicked
    | ItemSelected(item)
  ;

  let component = ReasonReact.reducerComponent("SelectButton");
  let make = (~items,
              ~selected,
              ~className          = "",
              ~renderButtonLabel  = item => item.label |> text,
              ~renderItem         = item => item.label |> text,
              ~onSelect,
              _) => {
    ...component,

    initialState: () => {
      isOpen: false
    },
    reducer: (action, state) =>
      switch action {
      | ButtonClicked =>
        ReasonReact.Update({ isOpen: !state.isOpen })

      | OutsideClicked =>
        ReasonReact.Update({ isOpen: false })

      | ItemSelected(item) =>
        ReasonReact.UpdateWithSideEffects(
          { isOpen: false },
          _self => onSelect(item.value)
        )
      },

    render: ({ reduce, state }) =>
      <div className=Styles.root>
        <OnClickOutside onClick=reduce(() => OutsideClicked)>
           
          <button className onClick=reduce(_e => ButtonClicked)>
            (
              items |> List.find(item => item.value === selected)
                    |> Option.getOrRaise
                    |> renderButtonLabel
            )
          </button>

          <menu className=(Styles.menu ++ (state.isOpen ? " s-open" : ""))>
            <ul>
              <Control.MapList items>
                ...(item =>
                  <li key     = item.label
                      onClick = reduce(_e => ItemSelected(item)) >
                    (renderItem(item))
                  </li>
                )
              </Control.MapList>
            </ul>
          </menu>

        </OnClickOutside>
      </div>
  };
};