open Rebase;

let retrieve = () => {
  let fromQueryParam = () => None;

  let fromLocalStorage = () =>
    Dom.Storage.(localStorage |> getItem("rebench-data"))
    |> Option.map(Js.Json.parseExn)
    |> Option.map((Obj.magic: Js.Json.t => (string, list(TestCase.t))));

  Option.(
    fromQueryParam() |> or_(fromLocalStorage())
  )
};

let persist = (setupCode, testCases) => {
  try {
    let data =
      (setupCode, testCases)
      |> Js.Json.stringifyAny
      |> Option.getOrRaise;

    Dom.Storage.(localStorage |> setItem("rebench-data", data))
  } {
  | e => Js.log(e)
  }
};
