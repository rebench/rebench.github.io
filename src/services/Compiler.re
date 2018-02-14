open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string, list(Editor.mark))
;

module SyntaxError = {
  type location = {
    line: int,
    column: int
  }
  and t = {
    message: string,
    from: location,
    until: location
  };

  let fromRefmt: Refmt.error => t = e => {
    message: e.message,
    from: {
      line: e.from.line - 2,
      column: e.from.column - 1
    },
    until: {
      line: e.until.line - 2,
      column: e.until.column
    }
  };

  [@bs.get] external loc : Js.Exn.t => {. "line": int, "column": int } = "";
  let fromAcorn = e => loc(e) |> loc => {
    message: e |> Js.Exn.message |> Option.getOrRaise,
    from: {
      line: loc##line - 1,
      column: loc##column
    },
    until: {
      line: loc##line - 1,
      column: loc##column + 1
    }
  };

  let toMark = (error: t) => {
    "from": {
      "line": error.from.line,
      "ch": error.from.column
    },
    "to": {
      "line": error.until.line,
      "ch": error.until.column
    },
    "options": {
      "className": "syntax-error",
      "title": error.message
    }
  };
};

let _assemble = (setup, code) => {
  /*"[@bs.config {no_export: no_export}];" ++*/
  setup ++ "\n" ++ code;
};

let _check = (language, code) =>
  switch language {
  | `RE => 
    Template.apply(language, code)
      |> Refmt.parseRE
      |> Result.map2(
          ast                   => ast |> Refmt.printRE,
          (`RefmtParseError(e)) => SyntaxError.fromRefmt(e));

  | `ML => 
    Template.apply(language, code)
      |> Refmt.parseML
      |> Result.map2(
          ast                   => ast |> Refmt.printRE,
          (`RefmtParseError(e)) => SyntaxError.fromRefmt(e));

  | `JS =>
    switch (Acorn.parse(code)) {
    | exception Js.Exn.Error(e) =>
      Error(SyntaxError.fromAcorn(e))
    | _ =>
      Ok(Template.apply(`JS, code))
    }
  };

let checkSetup = code =>
  code |> Refmt.parseRE
       |> fun | Ok(ast) =>
                ast |> Refmt.printML
                    |> BsBox.compile
                    |> (fun | Ok({ code, warnings }) when warnings == ""  => Ok(code)
                            | Ok({ code, warnings })                      => Warning(code, warnings)
                            | Error(`BsCompileError({ BsBox.message }))   => Error(message, []))
              | Error(`RefmtParseError(e)) =>
                e |> SyntaxError.fromRefmt
                  |> e => Error(e.message, [e |> SyntaxError.toMark]);

let compileTest = (setup, test) =>
  _check(test.Test.language, test.code)
  |> (fun | Error(e) => Error(e.message, [e |> SyntaxError.toMark])
          | Ok(code) =>
            _assemble(setup, code)
            |> Refmt.parseRE
            |> Result.map(Refmt.printML)
            |> Result.map(Fn.id)
            |> Result.flatMap(BsBox.compile)
            |> (fun | Ok({ code, warnings }) when warnings == ""  => Ok(code)
                    | Ok({ code, warnings })                      => Warning(code, warnings)
                    | Error(`RefmtParseError({ message }))
                    | Error(`BsCompileError({ message }))         => Error(message, [])));
