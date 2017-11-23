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


module Test = {
  type t = {
    id: Id.t,
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
    | Complete(result);
};


module Decode = {
  let id: Js.Json.t => Id.t = json => 
    json |> Json.Decode.string |> Obj.magic;

  let testCase: Js.Json.t => Test.t = json => {
    let (id, code) = Json.Decode.(json |> pair(id, string));
    { id, code }
  };

  let state: Js.Json.t => (string, list(Test.t)) = json =>
    Json.Decode.(json |> pair(string, list(testCase)))
};


module Encode = {
  let id: Id.t => Js.Json.t = value =>
    value |> Id.toString |> Json.Encode.string;

  let testCase: Test.t => Js.Json.t = value =>
    Json.Encode.(pair(id, string, (value.id, value.code)));

  let state: ((string, list(Test.t))) => Js.Json.t = value =>
    Json.Encode.(pair(string, list(testCase), value));
};
