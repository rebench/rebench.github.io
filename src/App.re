let testCaseTemplate = (id, code) => {j|let $id = () => {
  $code
};

$id();
|j};

type testCase = {
  data: TestCase.t,
  result: option(TestCase.result)
};

type state = {
  testCases: list(testCase),
  worker: ref(Worker.t),
};

type action =
  | RunAll
  | Add
  | Remove(TestCase.t)
  | Replace(TestCase.t)
  | CaseCycle(string, TestCase.result)
  | SuiteCycle(string, TestCase.result)
  | Nada;

let component = ReasonReact.reducerComponent("App");
let make = (_children) => {

  let newId = Utils.makeCounter(1);
  let makeTestCase = () => {
    data: TestCase.make(newId()),
    result: None
  };

  {
    ...component,

    initialState: () => {
      testCases: [makeTestCase(), makeTestCase()],
      worker: ref(Worker.make(~onMessage=Js.log, ~onError=Js.log))
    },

    didMount: ({ reduce, state }) => {
      ReasonReact.Update({
        ...state,
      worker: ref(Worker.make(
        ~onMessage=reduce((message) =>
          switch message##data##_type {
          | "caseCycle" => {
            let data = message##data##contents;
            CaseCycle(data##id, {
              hz: data##hz,
              sampleCount: data##sampleCount,
              rme: data##rme
            })
          }
          | "suiteCycle" =>
            let data = message##data##contents;
            SuiteCycle(data##id, {
              hz: data##hz,
              sampleCount: data##sampleCount,
              rme: data##rme
            })
          | "complete" => Nada
          | _ => failwith("unknown worker message")
          }
        ),
        ~onError=Js.log
      ))})
    },

    reducer: (action, state) =>
      switch action {
      
      | RunAll => {
        let code =
          state.testCases |> List.map((this) =>
                              testCaseTemplate(this.data.id, this.data.code)
                                |> Refmt.parseRE
                                |> Refmt.printML
                                |> BS.compile)
                          |> List.fold_left((acc, this) => acc ++ "\n" ++ this##js_code, "");

        let testCases =
          state.testCases |> List.map((this) => this.data.id)
                          |> Array.of_list;

        state.worker^.postMessage({ "code": code, "testCases": testCases });
        ReasonReact.NoUpdate
      }

      | Add =>
        ReasonReact.Update({
          ...state,
          testCases: [makeTestCase(), ...state.testCases]
        })

      | Remove(target) =>
        ReasonReact.Update({
          ...state,
          testCases: List.filter((this) => this.data.id !== target.id, state.testCases)
        })

      | Replace(target) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === target.id ? { data: target, result: None } : this, state.testCases)
        })
      
      | CaseCycle(id, result) =>
        ReasonReact.Update({
          ...state,
          testCases: List.map((this) => this.data.id === id ? { ...this, result: Some(result) } : this, state.testCases)
        })

      | SuiteCycle(id, result) =>
        ReasonReact.NoUpdate

      | Nada =>
        ReasonReact.NoUpdate

      },

    render: ({ reduce, state }) =>
      <div>
        <Toolbar onButtonClick=reduce(
          fun | `RunAll => RunAll
              | `Add => Add
        ) />
        (
          state.testCases |> List.map((this) =>
                               <TestCase.View
                                 key=this.data.id
                                 onChange=reduce((data) => Replace(this.data))
                                 onRemove=reduce(() => Remove(this.data))
                                 data=this.data
                                 result=this.result
                               />)
                          |> List.rev
                          |> Array.of_list
                          |> ReasonReact.arrayToElement
        )
      </div>
  }
};
