open! Rebase;

module Decode = {
  let id: Js.Json.t => Test.id = Fn.(
    Json.Decode.string >> Obj.magic
  );

  let language: Js.Json.t => Language.t = json => Json.Decode.(
    switch (json |> string) {
    | "re" => `RE
    | "ml" => `ML
    | "js" => `JS
    | language => raise @@ DecodeError({j|Unknown language: $language|j})
    }
  );

  let test: Js.Json.t => Test.t = Json.Decode.(
    either(
      /* version 2 */
      tuple3(id, language, string)
      |> map(((id, language, code)) => Test.{ id, language, code }),

      /* version 1 */
      pair(id, string)
      |> map(((id, code)) => Test.{ id, language: `RE, code })
    )
  );

  let state: Js.Json.t => (string, list(Test.t)) = Json.Decode.(
    pair(string, list(test))
  )
};

module Encode = {
  let id: Test.id => Js.Json.t =
    Fn.(Test.Id.toString >> Json.Encode.string);

  let language: Language.t => Js.Json.t = value =>
    Json.Encode.string(
      switch value {
      | `RE => "re"
      | `ML => "ml"
      | `JS => "js"
      }
    );

  let test: Test.t => Js.Json.t = value =>
    Json.Encode.(
      tuple3(id, language, string, (value.id, value.language, value.code))
    );

  let state: ((string, list(Test.t))) => Js.Json.t = Json.Encode.(
    pair(string, list(test))
  );
};
