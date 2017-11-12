let template = (id, code) => {j|let $id = () => {
  $code
};

$id();
|j};

let compile = (testCases) =>
  testCases |> List.map((this: TestCase.t) =>
                template(this.id, this.code)
                  |> Refmt.parseRE
                  |> Refmt.printML
                  |> BS.compile)
            |> List.fold_left((acc, this) => acc ++ "\n" ++ this##js_code, "");