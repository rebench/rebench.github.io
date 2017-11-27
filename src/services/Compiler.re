open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string)
;

let _applyTemplate = ({ Test.id, code }) => {
  let name = Test.Id.generateFunctionName(id);
{j|let $name = () => {
  $code
};
|j}};

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

type refmtError = {.
  "message": string,
  "location": Js.nullable({.
    "startLine": int,
    "startLineStartChar": int,
    "endLine": int,
    "endLineEndChar": int
  })
};
external jsExnToRefmtError : Js.Exn.t => refmtError = "%identity";

let _assemble = (setup, tests) =>
  tests |> List.map(_applyTemplate)
        |> List.reverse
        |> List.reduce((acc, this) => acc ++ this, setup);

let _reToML = reCode =>
  try (Result.Ok(
    reCode |> Refmt.parseRE
           |> Refmt.printML
  )) {
  | Js.Exn.Error(e) => Result.Error(e |> jsExnToRefmtError)
  };

let _compile = mlCode => {
  let (result, warnings) = 
    _captureConsoleErrors(() =>
      mlCode |> BS.compile
    );

  result |> Result.map(code => (code, warnings))
};

let checkSyntax = code =>
  _applyTemplate({ id: Test.Id.fromInt(0), code })
    |> _reToML;

let compile = (setup, tests) =>
  tests |> _assemble(setup)
        |> _reToML
        |> (fun | Result.Error(e) => Result.Error(e##message)
                | Result.Ok(code) => Result.Ok(code))
        |> Result.flatMap(_compile)
        |> fun | Result.Ok((code, None))            => Ok(code)
               | Result.Ok((code, Some(warnings)))  => Warning(code, warnings)
               | Result.Error(message)              => Error(message);
