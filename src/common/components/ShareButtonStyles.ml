open Glamor

let root = css [
  position "relative";

  Selector("& input", [
    background Colors.panelDark;
    transition "all 250ms";
    width "0";
    padding "0";
    color "#888";
  ]);

  Selector("& .tooltip", [
    display "none";
    position "absolute";
    zIndex "100";
    top "100%";
    right "1em";
    background "rgba(0, 0, 0, .6)";
    color "#aaa";
    whiteSpace "nowrap";
    padding ".4em .8em";
    borderRadius ".25em";
    fontSize ".8rem";

    Selector("& .arrow", [
      position "absolute";
      content " ";
      bottom "100%";
      right "2em";
      height "0";
      width "0";
      border ".5em solid transparent";
      (*pointerEvents "none";*)
      borderBottomColor "rgba(0, 0, 0, .6)";
      marginLeft ".5em";
    ]);

    Selector("& .confirmation-message", [
      display "none";
      padding "0 .75em";
    ]);
  ]);

  Selector("&:hover input", [
    width "25vw";
    marginRight "1em";
    padding ".3em";
  ]);

  Selector("&:hover .tooltip, &.s-show-confirmation .tooltip", [
    display "block";
  ]);

  Selector("&.s-show-confirmation", [
    Selector("& .tooltip .message", [
      display "none";
    ]);

    Selector("& .tooltip .confirmation-message", [
      display "block";
    ]);
  ])
]

let button = ButtonStyles.normal