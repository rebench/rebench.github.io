open Glamor

let root = css [
  margin "1em";
]

let footer = css [
  display "flex";
  background "#263238";
  color "#aaa";

  Selector("& button", [
    background "#263238";
    padding ".5em 1em";
    color "#aaa";

    Selector("& .mdi", [
      marginRight ".25em";
    ]);

    Selector("&:hover", [
      background "#364248";
    ]);
  ])
]

let state = css [
  padding ".5em 1em";

  Selector("& .mdi", [
    marginRight ".25em";
  ]);

  Selector("&.s-virgin .mdi", [
    color "rgba(255, 255, 255, .5)";
  ]);

  Selector("&.s-running .mdi", [
    color "#FFCB6D";
  ]);

  Selector("&.s-complete .mdi", [
    color "#C3E88D";
  ]);
]