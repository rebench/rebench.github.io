let apply = (language, code) => {
  switch language {
  | `RE =>
{j|let __test__ = () => {();
  $code
};|j}

  | `ML =>
{j|let __test__ () = (
  $code
)|j}

  | `JS =>
{j|[%%raw {|function __test__() {
$code
}

exports.__test__ = __test__|}];|j}
  }
};