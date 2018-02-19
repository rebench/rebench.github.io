open TypedGlamor

let container ~showConfirmation = css [
  position relative;

  select "& input" [
    background Colors.panelDark;
    transitions [AnimatableProperty.all, (ms 250), easeInOut, (ms 0)];
    width zero;
    padding zero;
    color (rgba 255 255 255 0.75);
  ];

  select "& .tooltip" [
    position absolute;
    display none;
    zIndex (int 100);
    offsetTop (pct 100.);
    offsetRight (em 1.);
    background (rgba 0 0 0 1.);
    color (hex "ccc");
    whiteSpace nowrap;
    padding2 ~v:(em 0.4) ~h:(em 0.8);
    borderRadius (em 0.25);
    fontSize (rem 0.8);

    select "::before" [
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

    if showConfirmation then
      add [
        display block;

        select "& .confirmation-message" [
          display block;
        ];

        select "& .message" [
          display none;
        ];
      ]
    else
      nothing;
  ];

  hover [
    select "& input" [
      width (vw 25.);
      marginRight (em 1.);
      padding (em 0.3);
    ];

    select "& .tooltip" [
      display block;
    ];
  ];
]