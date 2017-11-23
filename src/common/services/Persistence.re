open! Rebase;

module type Config = {
  let id: string;
  type data;
  type action;
  let default: unit => data;
  let reducer: (data, action) => data;
  let serialize: data => string;
  let deserialize: string => data;
};

module Make(Config: Config) = {
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
  let make = (renderChildren) => {
    ...component,

    initialState: () => _retrieve() |> Option.getOr(Config.default()), /* TODO: getOrLazy */

    reducer: (action, state) =>
      ReasonReact.UpdateWithSideEffects(
        Config.reducer(state, action),
        ({ state }) => _persist(state)
      ),

    render: ({ state, reduce }) => {
      let url = state |> _generateUrl;
      Location.replaceState(url);
      renderChildren(state, url, ~updateStore=reduce(action => action))
    }
  };
};