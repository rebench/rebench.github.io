open Rebase;

type pod = {
  data:   Test.t,
  state:  Test.state
};

type data = {
  setup: string,
  tests: list(pod)
};

type action =
  | AddTest
  | RemoveTest(Test.id)
  | UpdateTestData(Test.t)
  | UpdateTestState(Test.id, Test.state)
  | UpdateSetup(string)
  | Clear
;

let _nextId = data =>
  data.tests |> List.map(test => test.data.id)
             |> Test.Id.next;

let _recalculateScores = tests => {
  let fastest =
    tests |> List.map(
              fun | { state: Test.Complete({ hz }, _) } => Some(hz)
                  | _ => None)
          |> List.filter(Option.isSome)
          |> List.map(Option.getOrRaise)
          |> List.reduce(Js.Math.max_float, 0.);

  tests |> List.map(
            fun | { state: Test.Complete({ hz } as result, _) } as pod =>
                  { ...pod, state: Test.Complete(result, Some((hz -. fastest) /. fastest *. 100.)) }
                | test => test)
};

include Persistence.Make({
  let id = "rebench-data";

  type nonrec data = data;
  type nonrec action = action;

  let default = () => {
    setup: "/* shared code goes here */",
    tests: [
      { data: { id: Test.Id.fromInt(2), language: `RE, code: "Js.String.make(42)" }, state: Untested },
      { data: { id: Test.Id.fromInt(1), language: `RE, code: "string_of_int(42)" }, state: Untested }
    ],
  };

  let reducer = state =>
    fun | AddTest => `Update({
            ...state,
            tests:
              [
                {
                  data: { id: _nextId(state), language: `RE, code: "/* put stuff here */" },
                  state: Untested
                },
                ...state.tests
              ] 
          })

        | RemoveTest(id) => `UndoableUpdate({
            ...state,
            tests:
              state.tests |> List.filter(this => this.data.id !== id)
                          |> _recalculateScores
          })

        | UpdateTestData(data) => `Update({
            ...state,
            tests:
              state.tests |> List.map(this => this.data.id === data.id ? { data, state: Untested } : this)
                          |> _recalculateScores
          })

        | UpdateTestState(id, testState) => `Update({
            ...state,
            tests:
              state.tests |> List.map(this => this.data.id === id ? { ...this, state: testState } : this)
                          |> _recalculateScores
          })
        
        | UpdateSetup(setup) => `Update({
            setup,
            tests:
              state.tests |> List.map(this => { ...this, state: Untested })
          })

        | Clear =>
          `UndoableUpdate(default())
        ;

  let serialize = ({ setup, tests }) =>
    (setup, tests |> List.map(pod => pod.data))
      |> Model.Encode.state
      |> Json.stringify;

  let deserialize = data => {
    let (setup, tests) = 
      data |> Json.parseOrRaise
           |> Model.Decode.state;

    { setup, tests: tests |> List.map(data => { data, state: Untested }) }
  };
});
