open Glamor

let root = css [
  margin "1em 2em";

  Selector("&.s-not-even-close .score", [
    color Colors.red;
  ]);

  Selector("&.s-close .score", [
    color Colors.yellow;
  ]);

  Selector("&.s-fastest .score", [
    color Colors.green;
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