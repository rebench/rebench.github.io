open Rebase;

module Id : {
  type t;

  let next: list(t) => t;
  let fromInt: int => t;
  let toString: t => string;
  let generateFunctionName: t => string;
} = {
  type t = int;

  let next = Fn.(
    List.reduce(Js.Math.max_int, 0) >> succ
  );

  let fromInt =
    Fn.id;

  let toString =
    string_of_int;

  let generateFunctionName = id =>
    {j|__test$(id)__|j}
};

type id = Id.t;

type t = {
  id,
  language: Language.t,
  code: string
};

type result = {
  hz: float,
  rme: float,
  sampleCount: int
};

type state =
  | Untested
  | Running(result)
  | Error(string)
  | Complete(result, option(float)) /* TODO: should ideally not be option */
;