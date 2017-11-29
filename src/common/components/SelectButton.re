open Rebase;
open Helpers;

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
  let make = (~items, ~selected, ~className="", ~onSelect, _) => {
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
           
          <Button className
                  onClick = reduce((_) => ButtonClicked)
                  label   = (items |> List.find(item => item.value === selected) |> Option.getOrRaise).label />

          <menu className=(Styles.menu ++ (state.isOpen ? " s-open" : ""))>
            <ul>
              (
                items |> List.map(item =>
                          <li key     = item.label
                              onClick = reduce((_) => ItemSelected(item)) >
                            (item.label |> text)
                          </li>
                        )
                      |> List.toArray
                      |> ReasonReact.arrayToElement
              )
            </ul>
          </menu>

        </OnClickOutside>
      </div>
  };
};