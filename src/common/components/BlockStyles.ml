open TypedGlamor

let container ~isCollapsible ~isCollapsed = css [
  label "block";
  background Colors.panel;
  unsafe "overflow" "auto"; (* contain child element margins *)
  margin2 ~v:(em 1.) ~h:zero;
  borderLeft3 (px 2) solid transparent;

  if isCollapsible then
    select "& > header" [
      hover [
        background Colors.panelDark;
        unsafe "cursor" "pointer";
      ];
    ]
  else select "&" [];

  select "& > main" [
    marginTop (em 0.5);
    marginBottom (em 0.5);
  ];

  if isCollapsed then
    select "& > main" [
      display none;
    ]
  else
    select "&" [];

  select "&.s-error" [
    borderLeft3 (px 2) solid Colors.red;
  ];

  select "& .textHeader" [
    padding2 ~v:(em 0.75) ~h:(em 1.25);
    unsafe "fontSize" ".85em";
    color Colors.text;
    unsafe "textTransform" "lowercase";
    unsafe "fontVariant" "small-caps";
    unsafe "textAlign" "center";
  ];

  select "& footer" [
    unsafe "display" "flex";
    background Colors.panelDark;
    color Colors.text;

    select "& button" [
      padding2 ~v:(em 0.75) ~h:(em 1.);
    ];
  ]
]