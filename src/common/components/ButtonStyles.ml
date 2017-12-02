open Glamor

let common = [
  color Colors.text;
  padding "1em";
  cursor "pointer";

  Selector("&.m-icon-left .mdi", [
    marginRight ".25em";
  ]);

  Selector("&.m-icon-right .mdi", [
    marginLeft ".5em";
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