open Glamor

let root = css [
  background Colors.panel;
  margin "1em";
  paddingBottom ".5em";
]

let header = css [
  padding ".75em 1.25em";
  marginBottom ".5em";
  fontSize ".85em";
  color Colors.text;
  textTransform "lowercase";
  fontVariant "small-caps";
]

let clickableHeader = css [
  padding ".75em 1.25em";
  marginBottom ".5em";
  fontSize ".85em";
  color Colors.text;
  textTransform "lowercase";
  fontVariant "small-caps";

  Selector("&:hover", [
    background Colors.panelDark;
    cursor "pointer";
  ]);
]
