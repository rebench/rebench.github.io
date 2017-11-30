/*
module DebouncedCompiler = Debounce.Make({
  type input = Store.data;
  type output = Compiler.result;
  let compute = (data: input) =>
    Compiler.compile(data.setup, data.tests);
});
*/

ReactDOMRe.renderToElementWithId(
  <Store> 
    ...((data, url, ~updateStore) =>
      <App data url updateStore />
    )
  </Store>,
  "index"
);