open Glamor

let root = css [
  background Colors.panel;
  margin "2em";

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

let header = BlockStyles.header

let footer = css [
  display "flex";
  background Colors.panelDark;
  color Colors.text;
  marginTop ".5em";

  Selector("& button", [
    background Colors.panelDark;
    padding ".75em 1em";
    color Colors.text;

    Selector("& .mdi", [
      marginRight ".25em";
    ]);

    Selector("&:hover", [
      background Colors.highlightOverlay;
    ]);
  ])
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