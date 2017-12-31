open Rebase;

type ast;
type error = {.
  "message": string,
  "location": Js.nullable({.
    "startLine": int,
    "startLineStartChar": int,
    "endLine": int,
    "endLineEndChar": int
  })
};

[@bs.val] [@bs.module "reason"] external parseML : string => ast = "";
[@bs.val] [@bs.module "reason"] external parseRE : string => ast = "";
[@bs.val] [@bs.module "reason"] external printML : ast => string = "";
[@bs.val] [@bs.module "reason"] external printRE : ast => string = "";

let _wrap: ('a => 'b) => 'a => Result.t('b, error) = (f, x) =>
  try (Ok(f(x))) {
  | Js.Exn.Error(e) => Error(Obj.magic(e))
  };

let parseML = _wrap(parseML);
let parseRE = _wrap(parseRE);