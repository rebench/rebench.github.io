open TypedGlamor

let root = css [
  select "& > main" [
    unsafe "display" "flex";

    select "& > *" [
      unsafe "flex" "1";
      width (pct 50.);
    ];
  ];

  select "&.s-not-even-close .score" [
    color Colors.red;
  ];

  select "&.s-close .score" [
    color Colors.yellow;
  ];

  select "&.s-fastest .score" [
    color Colors.green;
  ];

  select "& button.m-language-reason" [
    color Colors.reason;
  ];

  select "& button.m-language-ocaml" [
    color Colors.ocaml;
  ];

  select "& button.m-language-javascript" [
    color Colors.javascript;
  ];
]

let header = css [
  unsafe "fontSize" ".85em";
  color Colors.text;
  unsafe "textTransform" "lowercase";
  unsafe "fontVariant" "small-caps";
  unsafe "display" "flex";
  unsafe "justifyContent" "space-between";
  unsafe "alignItems" "baseline";

  select "& button" [
    padding (em 0.75);
    unsafe "cursor" "pointer";

    select "& .mdi:before" [
      unsafe "transform" "translateY(2px)"; (* alignment fix due to the lowercase small-caps styling *)
      unsafe "opacity" ".35";
    ];

    hover [
      background Colors.highlightOverlay;
    ];
  ];

  select "& > .box" [
    unsafe "display" "flex";
    unsafe "flex" "1";

    select "&.right" [
      unsafe "justifyContent" "flex-end";
    ];
  ];

  select "& > .title" [
    display inlineBlock;
    padding (em 0.75);
    unsafe "textAlign" "center";
    unsafe "flex" "1";
  ];
]


let state = css [
  padding2 ~v:(em 0.75) ~h:(em 1.);

  select "& .mdi" [
    marginRight (em 0.25);
  ];

  select "&.s-running .mdi" [
    color Colors.yellow;
  ];

  select "&.s-error .mdi" [
    color Colors.red;
  ];

  select "&.s-complete .mdi" [
    color Colors.green;
  ];
]