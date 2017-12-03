open Rebase;

module Error = {
  type location = {
    line: int,
    column: int
  };

  type range = {
    from: location,
    to_: location
  };

  type t = {
    message: string,
    range: option(range)
  };

  let fromRefmt = e => {
    message: e##message,
    range: e##location |> Js.toOption |> Option.map(location => {
      from: {
        line: location##startLine - 2,
        column: location##startLineStartChar - 1
      },
      to_: {
        line: location##endLine - 2,
        column: location##endLineEndChar
      }
    })
  };

  [@bs.get] external loc : Js.Exn.t => {. "line": int, "column": int } = "";
  let fromAcorn = e => {
    message: e |> Js.Exn.message |> Option.getOrRaise,
    range: loc(e) |> loc => Some({
      from: {
        line: loc##line - 1,
        column: loc##column
      },
      to_: {
        line: loc##line - 1,
        column: loc##column + 1
      }
    })
  }

};

let check = (language, code): option(Error.t) =>
  switch language {
  | `RE => 
    Template.apply(language, code)
      |> Refmt.parseRE
      |> fun | Result.Ok(_) => None
             | Result.Error(e) => Some(Error.fromRefmt(e));

  | `ML => 
    Template.apply(language, code)
      |> Refmt.parseML
      |> fun | Result.Ok(_) => None
             | Result.Error(e) => Some(Error.fromRefmt(e));

  | `JS =>
    switch (Acorn.parse(code)) {
    | exception Js.Exn.Error(e) =>
      Some(Error.fromAcorn(e))
    | _ => {
      [%raw "0"]; /* TODO: Workaround for BS bug: https://github.com/BuckleScript/bucklescript/issues/2316 */
      None
    } 
    }
  };