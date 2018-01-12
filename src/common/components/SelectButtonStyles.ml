open TypedGlamor

let root = css [
  display inlineBlock;
]

let menu = css [
  position absolute;
  zIndex (int 100);
  display none;
  unsafe "transform" "translateX(-2px)";
  background Colors.panelDark;
  unsafe "boxShadow" "2px 2px 1px 0 rgba(0, 0, 0, .25)";

  select "&.s-open" [
    display block;
  ];

  select "& > ul > li" [
    padding (em 1.);
    unsafe "cursor" "pointer";

    hover [
      background Colors.highlightOverlay
    ];
  ];
]