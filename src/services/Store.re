type data = {
  setup: string,
  tests: list(Model.Test.t)
};

type action =
  | AddTest
  | RemoveTest(Model.Test.t)
  | UpdateTest(Model.Test.t)
  | UpdateSetup(string)
  | Clear
;

let _nextId = data =>
  data.tests |> List.map(test => test.Model.Test.id)
             |> Model.Id.next;

include Persistence.Make({
  let id = "rebench-data";

  type nonrec data = data;
  type nonrec action = action;

  let default = () => {
    setup: "/* code goes here */",
    tests: [
      { id: Model.Id.fromInt(2), code: "Js.String.make(42)" },
      { id: Model.Id.fromInt(1), code: "string_of_int(42)" }
    ],
  };

  let reducer = state =>
    fun | AddTest => {
            ...state,
            tests: [{ id: _nextId(state), code: "/* put sutff here */" }, ...state.tests]
          }

        | RemoveTest(test) => {
            ...state,
            tests: List.filter(this => this.Model.Test.id !== test.id, state.tests)
          }

        | UpdateTest(test) => {
          ...state,
          tests: List.map(this => this.Model.Test.id === test.id ? test : this, state.tests)
        }
        
        | UpdateSetup(setup) => {
          ...state,
          setup
        }

        | Clear =>
          default()
        ;

  let serialize = ({ setup, tests }) =>
    (setup, tests) |> Model.Encode.state
                   |> Js.Json.stringify;

  let deserialize = data => {
    let (setup, tests) = 
      data |> Js.Json.parseExn
           |> Model.Decode.state;

    { setup, tests }
  };
});
