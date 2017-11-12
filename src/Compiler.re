let template = (id, code) => {j|
let $id = () => {
  $code
};
|j};

let compile = (setupCode, testCases) =>
  testCases |> List.map((this: TestCase.t) => template(this.id, this.code))
            |> List.fold_left((acc, this) => acc ++ this, setupCode)
            |> Refmt.parseRE
            |> Refmt.printML
            |> BS.compile
            |> ((res) => res##js_code);