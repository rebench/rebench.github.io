open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string)
;


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

let _applyTemplate = ({ Test.id, language, code }) => {
  let name = Test.Id.generateFunctionName(id);

  switch language {
  | `RE =>
{j|let $name = () => {
  $code
};
|j}

  | `JS =>
{j|let $name = () => {
  [%raw {|$code|}]
};
|j}
  }
};

let _assemble = (setup, tests) =>
  tests |> List.map(_applyTemplate)
        |> List.reverse
        |> List.reduce((acc, this) => acc ++ this, setup);

let _compile = mlCode => {
  let (result, warnings) = 
    _captureConsoleErrors(() =>
      mlCode |> BS.compile
    );

  result |> Result.map(code => (code, warnings))
};

let checkSyntax = (language, code) =>
  _applyTemplate({ id: Test.Id.fromInt(0), language, code })
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
