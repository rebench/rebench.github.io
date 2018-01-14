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
    isMenuOpen: bool
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
      isMenuOpen: false
    },
    reducer: (action, state) =>
      switch action {
      | ButtonClicked =>
        ReasonReact.Update({ isMenuOpen: !state.isMenuOpen })

      | OutsideClicked =>
        ReasonReact.Update({ isMenuOpen: false })

      | ItemSelected(item) =>
        ReasonReact.UpdateWithSideEffects(
          { isMenuOpen: false },
          _self => onSelect(item.value)
        )
      },

    render: ({ reduce, state }) =>
      <div className=(Styles.container(~isMenuOpen=state.isMenuOpen) |> TypedGlamor.toString)>
        <OnClickOutside onClick=reduce(() => OutsideClicked)>
           
          <button className onClick=reduce(_e => ButtonClicked)>
            (
              items |> List.find(item => item.value === selected)
                    |> Option.getOrRaise
                    |> renderButtonLabel
            )
          </button>

          <menu>
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