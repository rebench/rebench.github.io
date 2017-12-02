open Glamor

let root = css [
  Selector("& > main", [
    display "flex";

    Selector("& > *", [
      flex "1";
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
  ]);

  Selector("& button.m-language-ocaml", [
    color Colors.ocaml;
  ]);

  Selector("& button.m-language-javascript", [
    color Colors.javascript;
  ]);
]

let header = css [
  fontSize ".85em";
  color Colors.text;
  textTransform "lowercase";
  fontVariant "small-caps";
  display "flex";
  justifyContent "space-between";
  alignItems "baseline";

  Selector("& button", [
    padding ".75em";
    cursor "pointer";

    Selector("& .mdi:before", [
      transform "translateY(2px)"; (* alignment fix due to the lowercase small-caps styling *)
      opacity ".35";
    ]);

    Selector("&:hover", [
      background Colors.highlightOverlay;
    ]);
  ]);

  Selector("& > .box", [
    display "flex";
    flex "1";

    Selector("&.right", [
      justifyContent "end";
    ]);
  ]);

  Selector("& > .title", [
    display "inline-block";
    padding ".75em";
    textAlign "center";
    flex "1";
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