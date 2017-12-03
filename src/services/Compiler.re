open Rebase;

type result =
  | Ok(string)
  | Warning(string, string)
  | Error(string)
;


let _assemble = (setup, test: Test.t) => {
  let code = Template.apply(test.language, test.code);
  let code = switch test.language {
    | `ML => code |> Refmt.parseML
                  |> Result.map(Refmt.printRE)
    | _ => Result.Ok(code)
    };

  /*"[@bs.config {no_export: no_export}];" ++*/
  code |> Result.map(code => setup ++ "\n" ++ code);
};

let compile = (setup, test) =>
  _assemble(setup, test)
    |> Result.flatMap(Refmt.parseRE)
    |> Result.map(Refmt.printML)
    |> (fun | Result.Error(e) => Result.Error(e##message)
            | Result.Ok(code) => Result.Ok(code))
    |> Result.flatMap(BS.compile)
    |> fun | Result.Ok((code, None))           => Ok(code)
           | Result.Ok((code, Some(warnings))) => Warning(code, warnings)
           | Result.Error(message)             => Error(message);


include Debounce.Make({
  type input = (string, Test.t);
  type output = result;
  let compute = ((setup, test)) =>
    compile(setup, test);
});
