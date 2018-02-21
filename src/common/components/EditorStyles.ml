open TypedGlamor

let container = css [
  select "& .CodeMirror" [
    height auto;
    fontFamilies [
      "SFMono-Regular";
      "Consolas";
      "Roboto Mono";
      "Droid Sans Mono";
      "Liberation Mono";
      "Menlo";
      "Courier";
      monospace
    ];
    fontSize (px 14);
  ];

  select "& .CodeMirror .syntax-error" [
    background (hex "EC5F67");
    color black;
  ];
]
