ReactDOMRe.renderToElementWithId(
  <Store> 
    ...((data, url, ~updateStore) => {
      let compilerResult = Compiler.compile(data.setup, data.tests);
      <App data url updateStore compilerResult/>
    })
  </Store>,
  "index"
);
