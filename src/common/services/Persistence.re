open! Rebase;

type update('state) = [
| `Update('state)
| `UndoableUpdate(string, 'state)
| `SilentUpdate('state)
];

module type Config = {
  let id: string;
  type data;
  type action;
  let default: unit => data;
  let reducer: (data, action) => update(data);
  let serialize: data => string;
  let deserialize: string => data;
};


module Make(Config: Config) = {
  type state('a) = {
    current: 'a,
    undo: option((string, 'a))
  };

  let _prefix = "?" ++ Config.id ++ "=";
  let _generateUrl = data =>
    Location.(origin ++ pathname ++ _prefix ++ (Config.serialize(data) |> LZString.compress));

  let _retrieve = () => {
    let fromUrl = () => {
      if (Location.search |> Js.String.startsWith(_prefix)) {
        Location.search |> Js.String.sliceToEnd(~from=String.length(_prefix))
                        |> LZString.decompress
      } else {
        None
      }
    };

    let fromLocalStorage = () =>
      Dom.Storage.(localStorage |> getItem(Config.id));

    fromUrl() |> Option.or_(fromLocalStorage())
              |> Option.map(Config.deserialize);
  };

  let _persist: Config.data => unit = data => {
    try {
      Dom.Storage.(localStorage |> setItem(Config.id, Config.serialize(data)))
    } {
    | e => Js.log(e)
    }
  };

  let component = ReasonReact.reducerComponent("Persistence");
  let make = renderChildren => {
    ...component,

    initialState: () => {
      current: _retrieve() |> Option.getOr(Config.default()), /* TODO: getOrLazy */
      undo: None
    },

    reducer: (action, state) =>
      switch (Config.reducer(state.current, action)) {
      | `Update(next)         =>
        ReasonReact.UpdateWithSideEffects(
          { current: next, undo: None },
          ({ state }) => _persist(state.current)
        )
      | `UndoableUpdate(description, next) =>
        ReasonReact.UpdateWithSideEffects(
          { current: next, undo: Some((description, state.current)) },
          ({ state }) => _persist(state.current)
        )
      | `SilentUpdate(next)   =>
        ReasonReact.Update(
          { ...state, current: next}
        )
      },

    render: ({ send, state }) => {
      let url = state.current |> _generateUrl;

      /* don't unnecessarily call replaceState, to avoid triggering WebKit SecurityError */
      if (url !== Location.href) {
        Location.replaceState(url);
      };
      
      renderChildren(state, url, ~updateStore=send)
    }
  };
};