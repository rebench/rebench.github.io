
module Decode = {
  let id: Js.Json.t => Test.id = json => 
    json |> Json.Decode.string |> Obj.magic;

  let testCase: Js.Json.t => Test.t = json => {
    let (id, code) = Json.Decode.(json |> pair(id, string));
    { id, code }
  };

  let state: Js.Json.t => (string, list(Test.t)) = json =>
    Json.Decode.(json |> pair(string, list(testCase)))
};


module Encode = {
  let id: Test.id => Js.Json.t = value =>
    value |> Test.Id.toString |> Json.Encode.string;

  let testCase: Test.t => Js.Json.t = value =>
    Json.Encode.(pair(id, string, (value.id, value.code)));

  let state: ((string, list(Test.t))) => Js.Json.t = value =>
    Json.Encode.(pair(string, list(testCase), value));
};
