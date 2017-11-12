open Glamor

let root = css [
  background "#263238";
]

let button = css [
  background "#263238";
  color "#aaa";
  padding "1em";

  Selector("& .mdi", [
    marginRight ".25em";
  ]);

  Selector("&:hover", [
    background "#364248";
  ]);
]