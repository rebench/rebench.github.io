open Rebase;

let storageKey = "rebench-data";

let retrieve = () =>
  Dom.Storage.(localStorage |> getItem(storageKey));

let persist: Js.Json.t => unit = json => {
  try {
    let data = Js.Json.stringify(json);
    Dom.Storage.(localStorage |> setItem(storageKey, data))
  } {
  | e => Js.log(e)
  }
};
