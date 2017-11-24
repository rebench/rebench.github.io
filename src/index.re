module DebouncedCompiler = Debounce.Make({
  type input = Store.data;
  type output = Compiler.result;
  let compute = (data: input) =>
    Compiler.compile(data.setup, data.tests);
});

ReactDOMRe.renderToElementWithId(
  <Store> 
    ...((data, url, ~updateStore) =>
      <DebouncedCompiler input=data wait=300>
        ...(compilerResult =>
          <App data url updateStore compilerResult/>)
      </DebouncedCompiler>
    )
  </Store>,
  "index"
);
