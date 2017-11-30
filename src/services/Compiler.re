open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string)
;

type location = {
  line: int,
  column: int
};

type range = {
  from: location,
  to_: location
};

type syntaxError = {
  message: string,
  range: option(range)
};

[%%raw {|
  function _captureConsoleErrors(f) {
    let errors = "";
    const _consoleError = console.error;
    console.error = (...args) => args.forEach(argument => errors += argument + `\n`);

    let res = f();

    console.error = _consoleError;
    return [res, errors ? [errors] : 0];
  }
|}];
[@bs.val] external _captureConsoleErrors : (unit => 'a) => ('a, option(string)) = "";

let _mlToRE = reCode =>
  try (Result.Ok(
    reCode |> Refmt.parseML
           |> Refmt.printRE
  )) {
  | Js.Exn.Error(e) => Result.Error(e |> Refmt.errorFromExn)
  };

let _reToML = reCode =>
  try (Result.Ok(
    reCode |> Refmt.parseRE
           |> Refmt.printML
  )) {
  | Js.Exn.Error(e) => Result.Error(e |> Refmt.errorFromExn)
  };

let _applyTemplate = ({ Test.language, code }) => {
  switch language {
  | `RE =>
{j|let __test__ = () => {
  $code
};
|j}

  | `JS =>
{j|let __test__ = () => {
  [%raw {|$code|}]
};
|j}
  }
};

let _assemble = (setup, test) =>
  setup ++ "\n" ++ _applyTemplate(test);

let _compile = mlCode => {
  let (result, warnings) = 
    _captureConsoleErrors(() =>
      mlCode |> BS.compile
    );

  result |> Result.map(code => (code, warnings))
};

[@bs.get] external loc : Js.Exn.t => {. "line": int, "column": int } = "";

let checkSyntax = (language, code): option(syntaxError) =>
  switch language {
  | `RE => 
    _applyTemplate({ id: Test.Id.fromInt(0), language: `RE, code })
      |> _reToML
      |> fun | Result.Ok(_) => None
             | Result.Error(e) => Some({
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
             });

  | `JS =>
    switch (Acorn.parse(code)) {
    | exception Js.Exn.Error(e) => Js.Exn.message(e) |> Option.map(message => {
        message,
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
      })
    | _ => {
      [%raw "0"]; /* TODO: Workaround for BS bug: https://github.com/BuckleScript/bucklescript/issues/2316 */
      None
    } 
    }
  };

let compile = (setup, test) =>
  _assemble(setup, test)
        |> _reToML
        |> (fun | Result.Error(e) => Result.Error(e##message)
                | Result.Ok(code) => Result.Ok(code))
        |> Result.flatMap(_compile)
        |> fun | Result.Ok((code, None))            => Ok(code)
               | Result.Ok((code, Some(warnings)))  => Warning(code, warnings)
               | Result.Error(message)              => Error(message);
