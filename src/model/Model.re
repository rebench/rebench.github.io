module Decode = {
  let id: Js.Json.t => Test.id = json => 
    json |> Json.Decode.string |> Obj.magic;

  let language: Js.Json.t => Language.t = json =>
    switch (Json.Decode.string(json)) {
    | "re" => `RE
    | "ml" => `ML
    | "js" => `JS
    | language => raise @@ Json.Decode.DecodeError({j|Unknown language: $language|j})
    };

  let test: Js.Json.t => Test.t = json => {
    let (id, language, code) = Json.Decode.(
      json |> either(
        tuple3(id, language, string),                           /* version 2 */
        map(((id, code)) => (id, `RE, code), pair(id, string))  /* version 1 */
      )
    );
    { id, language, code }
  };

  let state: Js.Json.t => (string, list(Test.t)) = json =>
    Json.Decode.(
      json |> pair(string, list(test))
    )
};

module Encode = {
  let tuple3 = (encodeA, encodeB, encodeC, (a, b, c)) => Json.Encode.jsonArray([|encodeA(a), encodeB(b), encodeC(c)|]);
  
  let id: Test.id => Js.Json.t = value =>
    value |> Test.Id.toString |> Json.Encode.string;

  let language: Language.t => Js.Json.t = value =>
    Json.Encode.string(switch value {
    | `RE => "re"
    | `ML => "ml"
    | `JS => "js"
    });

  let test: Test.t => Js.Json.t = value =>
    Json.Encode.(
      tuple3(id, language, string, (value.id, value.language, value.code))
    );

  let state: ((string, list(Test.t))) => Js.Json.t = value =>
    Json.Encode.(
      pair(string, list(test), value)
    );
};
