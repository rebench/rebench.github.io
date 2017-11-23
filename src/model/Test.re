open Rebase;

module Id : {
  type t;

  let next : list(t) => t;
  let fromInt : int => t;
  let toString : t => string;
  let generateFunctionName : t => string;
} = {
  type t = int;

  let next = ids =>
    ids |> List.reduce(Js.Math.max_int, 0)
        |> succ;

  let fromInt = n => n;
  let toString = string_of_int;

  let generateFunctionName = id => {j|__testCase$(id)__|j}
};

type id = Id.t;

type t = {
  id: id,
  code: string
};

type result = {
  hz: float,
  rme: float,
  sampleCount: int,
  relativeScore: option(float)
};

type state =
  | Untested
  | Running(result)
  | Complete(result)
;