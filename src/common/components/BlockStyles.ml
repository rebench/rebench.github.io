open Glamor

let root = css [
  background Colors.panel;
  overflow "auto"; (* contain child element margins *)
  margin "1em";
  borderLeft ("2px solid transparent");

  Selector("& > header", [
    padding ".75em 1.25em";
    fontSize ".85em";
    color Colors.text;
    textTransform "lowercase";
    fontVariant "small-caps";
  ]);

  Selector("&.collapsible > header", [
    Selector("&:hover", [
      background Colors.panelDark;
      cursor "pointer";
    ]);
  ]);

  Selector("& > main", [
    marginTop ".5em";
    marginBottom ".5em";
  ]);

  Selector("&.s-collapsed > main", [
    display "none";
  ]);

  Selector("&.s-error", [
    borderLeft ("2px solid " ^ Colors.red);
  ]);
]

let footer = css [
  display "flex";
  background Colors.panelDark;
  color Colors.text;

  Selector("& button", [
    padding ".75em 1em";
  ]);
]
