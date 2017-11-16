open Rebase;

[@bs.val] external _origin : string = "window.location.origin";
[@bs.val] external _pathname : string = "window.location.pathname";
[@bs.val] external _search : string = "window.location.search";
[@bs.val] external replaceState : ([@bs.as {json|null|json}] _) => ([@bs.as ""] _) => string => unit = "window.history.replaceState";

let _generateShareableUrl = data =>
  _origin ++ _pathname ++ "?state=" ++ LZString.compress(data);

let _setQueryParam = data =>
  data |> _generateShareableUrl
       |> replaceState;


let retrieve: unit => option((string, list(TestCase.t))) = () => {
  let fromQueryParam = () => {
    let prefix = "?state=";
    let queryParam = _search;

    if (queryParam |> Js.String.startsWith(prefix)) {
      queryParam |> Js.String.sliceToEnd(~from=String.length(prefix))
                 |> LZString.decompress
    } else {
      None
    }
  };

  let fromLocalStorage = () =>
    Dom.Storage.(localStorage |> getItem("rebench-data"));

  fromQueryParam() |> Option.or_(fromLocalStorage())
                   |> Option.map(Js.Json.parseExn)
                   |> Option.map((Obj.magic: Js.Json.t => (string, list(TestCase.t)))); /* TODO: bs-json */
};

let persist: (string, list(TestCase.t)) => unit = (setupCode, testCases) => {
  let data =
    (setupCode, testCases) |> Js.Json.stringifyAny
                           |> Option.getOrRaise;

  _setQueryParam(data);

  try {
    Dom.Storage.(localStorage |> setItem("rebench-data", data))
  } {
  | e => Js.log(e)
  }
};
