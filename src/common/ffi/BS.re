open Rebase;

[@bs.val] [@bs.scope ("window", "ocaml")] external compile : string => string = "";
let compile : string => Result.t(string, string) = code =>
  code |> compile
       |> Js.Json.parseExn
       |> Js.Json.classify /* TODO: use bs-json? */
       |> fun | JSONString(err) => Result.Error(err)
              | JSONObject(res) =>
                Js.Dict.get(res, "js_code")
                |> Option.flatMap(Js.Json.decodeString)
                |> Option.mapOr(
                    code => Result.Ok(code),
                    Result.Error("Unrecognized compiler output"))
              | _ => Result.Error("Unrecognized compiler output");