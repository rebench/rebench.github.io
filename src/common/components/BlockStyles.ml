open Glamor

let root = css [
  background Colors.panel;
  overflow "auto"; (* contain child element margins *)
  margin "1em";
]

let header = css [
  padding ".75em 1.25em";
  fontSize ".85em";
  color Colors.text;
  textTransform "lowercase";
  fontVariant "small-caps";
]

let clickableHeader = css [
  padding ".75em 1.25em";
  fontSize ".85em";
  color Colors.text;
  textTransform "lowercase";
  fontVariant "small-caps";

  Selector("&:hover", [
    background Colors.panelDark;
    cursor "pointer";
  ]);
]

let content = css [
  marginTop ".5em";
  marginBottom ".5em";
]

let footer = css [
  display "flex";
  background Colors.panelDark;
  color Colors.text;

  Selector("& button", [
    padding ".75em 1em";
  ]);
]
