open Rebase;

module Decode = {
  let success = json =>
    Json.Decode.(
      Result.Ok(
        json |> field("js_code", string)
      )
    );

  let error = json =>
    Json.Decode.(
      Result.Error(
        json |> field("text", string)
      )
    );
};

[@bs.val] [@bs.scope ("window", "ocaml")] external compile : string => string = "";
let compile : string => Result.t(string, string) = code =>
  try (
    code |> compile
         |> Js.Json.parseExn
         |> Json.Decode.either(Decode.success, Decode.error)
  ) {
  | Json.Decode.DecodeError(e) => Result.Error("Unrecognized compiler output: " ++ e);
  }