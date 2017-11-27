open Rebase;

let _toMark = error => {
  "from": error##location |> Js.Nullable.to_opt |> Option.mapOr(location =>{
    "line": location##startLine - 2,
    "ch": location##startLineStartChar - 1
  }, { "line": 0, "ch": 0 }),
  "to": error##location |> Js.Nullable.to_opt |> Option.mapOr(location =>{
    "line": location##endLine - 2,
    "ch": location##endLineEndChar
  }, { "line": 0, "ch": 1 }),
  "options": {
    "className": "syntax-error",
    "title": error##message
  }
};

include Debounce.Make({
  type input = string;
  type output = (bool, list(Editor.mark));
  let compute = input =>
    input |> Compiler.checkSyntax
          |> fun | Result.Ok(_) => (false, [])
                 | Result.Error(error) => (true, [error |> _toMark]);
});
