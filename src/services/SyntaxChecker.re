open Rebase;

let _toMark = (error: Compiler.syntaxError) => {
  "from": error.range |> Option.mapOr((range: Compiler.range) => {
    "line": range.from.line,
    "ch": range.from.column
  }, { "line": 0, "ch": 0 }),
  "to": error.range |> Option.mapOr((range: Compiler.range) => {
    "line": range.to_.line,
    "ch": range.to_.column
  }, { "line": 0, "ch": 1 }),
  "options": {
    "className": "syntax-error",
    "title": error.message
  }
};

include Debounce.Make({
  type input = (Syntax.language, string);
  type output = (bool, list(Editor.mark));
  let compute = ((language, code)) =>
    code |> Compiler.checkSyntax(language)
         |> fun | None => (false, [])
                | Some(error) => (true, [error |> _toMark]);
});
