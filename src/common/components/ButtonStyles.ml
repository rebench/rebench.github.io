open TypedGlamor

let common = [
  color Colors.text;
  padding (em 1.);
  unsafe "cursor" "pointer";

  select "&.m-icon-left .mdi" [
    marginRight (em 0.25);
  ];

  select "&.m-icon-right .mdi" [
    marginLeft (em 0.5);
  ];

  hover [
    background Colors.highlightOverlay;
  ];
]

let normal = css (common @ [
  background Colors.panel;
])

let dark = css (common @ [
  background Colors.panelDark;
])