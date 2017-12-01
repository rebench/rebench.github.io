open Glamor

let root = css [
  Selector("& > main", [
    display "flex";

    Selector("& > *", [
      flexGrow "1";
      flexBasis "0";
      width "50%";
    ]);
  ]);

  Selector("&.s-not-even-close .score", [
    color Colors.red;
  ]);

  Selector("&.s-close .score", [
    color Colors.yellow;
  ]);

  Selector("&.s-fastest .score", [
    color Colors.green;
  ]);

  Selector("& button.m-language-reason", [
    color Colors.reason;
    (*borderTop ("1px solid " ^ Colors.reason)*)
  ]);

  Selector("& button.m-language-javascript", [
    color Colors.javascript;
    (*borderTop ("1px solid" ^ Colors.javascript)*)
  ]);
]

let state = css [
  padding ".75em 1em";

  Selector("& .mdi", [
    marginRight ".25em";
  ]);

  Selector("&.s-running .mdi", [
    color Colors.yellow;
  ]);

  Selector("&.s-complete .mdi", [
    color Colors.green;
  ]);
]