open Rebase;

[@bs.val] external _origin : string = "window.location.origin";
[@bs.val] external _pathname : string = "window.location.pathname";
[@bs.val] external _search : string = "window.location.search";

let generate = json => {
  let data = json |> Js.Json.stringify
                  |> LZString.compress;

  _origin ++ _pathname ++ "?state=" ++ data
};

let retrieve = () => {
  let prefix = "?state=";
  let queryParam = _search;

  if (queryParam |> Js.String.startsWith(prefix)) {
    queryParam |> Js.String.sliceToEnd(~from=String.length(prefix))
                |> LZString.decompress
  } else {
    None
  }
};

[@bs.val] external set : ([@bs.as {json|null|json}] _) => ([@bs.as ""] _) => string => unit = "window.history.replaceState";
