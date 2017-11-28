open Glamor

let root = css [
  Selector("& .CodeMirror", [
    height "auto";
    fontFamily {|"SFMono-Regular", Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Menlo,Courier,monospace|};
    fontSize "14px";
  ]);

  Selector("& .CodeMirror .syntax-error", [
    background "#EC5F67";
    color "black";
  ]);

]