open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string)
;

let template = ({ Test.id, code }) => {
  let name = Test.Id.generateFunctionName(id);
{j|
let $name = () => {
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

let _assemble = (setup, tests) =>
  tests |> List.map(template)
        |> List.reverse
        |> List.reduce((acc, this) => acc ++ this, setup);

let _reToML = reCode =>
  try (Result.Ok(
    reCode |> Refmt.parseRE
           |> Refmt.printML
  )) {
  | Js.Exn.Error(e) => Result.Error(e |> Js.Exn.message |> Option.getOrRaise)
  };

let _compile = mlCode => {
  let (result, warnings) = 
    _captureConsoleErrors(() =>
      mlCode |> BS.compile
    );

  result |> Result.map(code => (code, warnings))
};

let compile = (setup, tests) =>
  tests |> _assemble(setup)
        |> _reToML
        |> Result.flatMap(_compile)
        |> fun | Result.Ok((code, None))            => Ok(code)
               | Result.Ok((code, Some(warnings)))  => Warning(code, warnings)
               | Result.Error(message)              => Error(message);
