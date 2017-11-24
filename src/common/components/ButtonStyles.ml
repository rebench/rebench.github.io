open Glamor

let common = [
  background "red";
  color Colors.text;
  padding "1em";

  Selector("& .mdi", [
    marginRight ".25em";
  ]);

  Selector("&:hover", [
    background Colors.highlightOverlay;
  ]);
]

let normal = css (common @ [
  background Colors.panel;
])

let dark = css (common @ [
  background Colors.panelDark;
])