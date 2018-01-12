open TypedGlamor

let root = css [
  select "& .CodeMirror" [
    height auto;
    unsafe "fontFamily" {|"SFMono-Regular", Consolas,"Roboto Mono","Droid Sans Mono","Liberation Mono",Menlo,Courier,monospace|};
    unsafe "fontSize" "14px";
  ];

  select "& .CodeMirror .syntax-error" [
    background (hex 0xEC5F67);
    color black;
  ];
]