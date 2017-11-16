let template = (testCase: TestCase.t) => {
  let name = TestCase.Id.generateFunctionName(testCase.id);
  let code = testCase.code;
{j|
let $name = () => {
  $code
};
|j}};

let compile = (setupCode, testCases) =>
  testCases |> List.map(template)
            |> List.rev
            |> List.fold_left((acc, this) => acc ++ this, setupCode)
            |> Refmt.parseRE
            |> Refmt.printML
            |> BS.compile
            |> res => res##js_code;