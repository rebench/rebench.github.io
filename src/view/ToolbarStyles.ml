open Glamor

let root = css [
  background Colors.panel;

  Selector("& > div", [ (* matches the inner width container *)
    display "flex";

    Selector("& > .logo", [
      width "45px";
      objectFit "contain";
      objectPosition "left";
    ]);
  ]);
]

let separator = css [
  flexGrow "1";
]