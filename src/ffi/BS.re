type result = {.
  "js_code": string
};

[@bs.val] [@bs.scope ("window", "ocaml")] external compile : string => string = "";
let compile : string => result = code =>
  code |> compile
       |> Js.Json.parseExn
       |> Obj.magic 