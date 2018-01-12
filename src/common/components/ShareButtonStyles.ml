open TypedGlamor

let root = css [
  position relative;

  select "& input" [
    background Colors.panelDark;
    transitions [AnimatableProperty.all, (ms 250), easeInOut, (ms 0)];
    width zero;
    padding zero;
    color (rgba 255 255 255 0.75);
  ];

  select "& .tooltip" [
    display none;
    position absolute;
    zIndex (int 100);
    offsetTop (pct 100.);
    offsetRight (em 1.);
    background (rgba 0 0 0 1.);
    color (hex 0xccc);
    unsafe "whiteSpace" "nowrap";
    padding2 ~v:(em 0.4) ~h:(em 0.8);
    borderRadius (em 0.25);
    unsafe "fontSize" ".8rem";

    select "& .arrow" [
      position absolute;
      unsafe "content" " ";
      offsetBottom (pct 100.);
      offsetRight (em 2.);
      height zero;
      width zero;
      border3 (em 0.5) solid transparent;
      (*pointerEvents "none";*)
      borderBottomColor (rgba 0 0 0 1.);
      marginLeft (em 0.5);
    ];

    select "& .confirmation-message" [
      display none;
      padding2 ~v:zero ~h:(em 0.75);
    ];
  ];

  hover [
    select "& input" [
      width (vw 25.);
      marginRight (em 1.);
      padding (em 0.3);
    ];

    select "& .tooltip, &.s-show-confirmation .tooltip" [
      display block;
    ];
  ];

  select "&.s-show-confirmation .tooltip" [
    display block;
  ];

  select "&.s-show-confirmation" [
    select "& .tooltip .message" [
      display none;
    ];

    select "& .tooltip .confirmation-message" [
      display block;
    ];
  ]
]