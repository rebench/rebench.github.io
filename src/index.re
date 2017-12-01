ReactDOMRe.renderToElementWithId(
  <Store> 
    ...((data, url, ~updateStore) =>
      <App data url updateStore />
    )
  </Store>,
  "index"
);