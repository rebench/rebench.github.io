open Rebase;

module Decode = {
  let success = json =>
    Json.Decode.(
      Ok(
        json |> field("js_code", string)
      )
    );

  let error = json =>
    Json.Decode.(
      Error(
        json |> field("text", string)
      )
    );
};

[@bs.val] [@bs.scope ("window", "ocaml")] external compile : string => string = "";

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

let compile : string => Result.t((string, option(string)), string) = code =>
  try {
    let (json, warnings) = 
      _captureConsoleErrors(() =>
        code |> compile
      );
    
    json |> Js.Json.parseExn
         |> Json.Decode.either(Decode.success, Decode.error)
         |> result => result |> Result.map(code => (code, warnings));
  } {
  | Json.Decode.DecodeError(e) =>
    Error("Unrecognized compiler output: " ++ e);
  }