open Rebase;

let template = (testCase: TestCase.t) => {
  let name = TestCase.Id.generateFunctionName(testCase.id);
  let code = testCase.code;
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

let _assemble = (setupCode, testCases) =>
  testCases |> List.map(template)
            |> List.reverse
            |> List.reduce((acc, this) => acc ++ this, setupCode);

let _reToML = reCode =>
  try (Result.Ok(
    reCode |> Refmt.parseRE
           |> Refmt.printML
  )) {
  | Js.Exn.Error(e) => Result.Error(e |> Js.Exn.message |> Option.getOrRaise)
  };

let _compile = mlCode => {
  let (res, warnings) = 
    _captureConsoleErrors(() =>
      mlCode |> BS.compile
    );

  res |> Result.map(code => (code, warnings))
};

let compile = (setupCode, testCases) =>
  testCases |> _assemble(setupCode)
            |> _reToML
            |> Result.flatMap(_compile);