open TypedGlamor

let root = css [
  background Colors.panel;
  unsafe "overflow" "auto"; (* contain child element margins *)
  margin2 ~v:(em 1.) ~h:zero;
  borderLeft3 (px 2) solid transparent;

  select "&.collapsible > header" [
    hover [
      background Colors.panelDark;
      unsafe "cursor" "pointer";
    ];
  ];

  select "& > main" [
    marginTop (em 0.5);
    marginBottom (em 0.5);
  ];

  select "&.s-collapsed > main" [
    display none;
  ];

  select "&.s-error" [
    borderLeft3 (px 2) solid Colors.red;
  ];
]

let textHeader = css [
  padding2 ~v:(em 0.75) ~h:(em 1.25);
  unsafe "fontSize" ".85em";
  color Colors.text;
  unsafe "textTransform" "lowercase";
  unsafe "fontVariant" "small-caps";
  unsafe "textAlign" "center";
]


let footer = css [
  unsafe "display" "flex";
  background Colors.panelDark;
  color Colors.text;

  select "& button" [
    padding2 ~v:(em 0.75) ~h:(em 1.);
  ];
]
