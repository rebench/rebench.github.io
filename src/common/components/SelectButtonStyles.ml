open Glamor

let root = css [
  display "inline-block";
]

let menu = css [
  position "absolute";
  zIndex "100";
  display "none";
  transform "translateX(-2px)";
  background Colors.panel;
  borderTop ("1px solid" ^ Colors.background);
  boxShadow "2px 2px 1px 0 rgba(0, 0, 0, .25)";

  Selector("&.s-open", [
    display "block";
  ]);

  Selector("& > ul > li", [
    padding "1em";
    cursor "pointer";

    Selector("&:hover", [
      background Colors.highlightOverlay
    ]);
  ]);
]