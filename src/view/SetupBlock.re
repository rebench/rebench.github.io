open! Rebase;
open! Vrroom;

module SyntaxChecker = Debounce.Make({
  type input = string;
  type output = (option(string), list(Editor.mark));
  let compute = code =>
    code |> Compiler.checkSetup
         |> fun | Compiler.Ok(_)
                | Compiler.Warning(_, _)       => (None, [])
                | Compiler.Error(error, marks) => (Some(error), marks);
});

let component = ReasonReact.statelessComponent("SetupBlock");
let make = (~code, ~onChange, _:childless) => {
  ...component,

  render: _self =>
    <SyntaxChecker input=code wait=100>
      ...(((error, marks)) =>

        <Block_ ?error header=`Text("Setup") collapsible=true>
          <Editor value=code lang=`RE onChange marks />
        </Block_>)

    </SyntaxChecker>
};