type t = [
  | `RE
  | `ML
  | `JS
];

let name =
  fun | `RE => "Reason"
      | `ML => "OCaml"
      | `JS => "JavaScript"
;

let abbreviation =
  fun | `RE => "RE"
      | `ML => "ML"
      | `JS => "JS"
;