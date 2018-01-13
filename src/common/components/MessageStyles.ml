open TypedGlamor


let container ~kind = css [
  color (
    match kind with
    | `Error   -> Colors.red
    | `Warning -> Colors.yellow
  );
  padding (em 1.)
]