open Glamor

let button = css [
  background Colors.panel;
  color Colors.text;
  padding "1em";

  Selector("& .mdi", [
    marginRight ".25em";
  ]);

  Selector("&:hover", [
    background Colors.highlightOverlay;
  ]);
]