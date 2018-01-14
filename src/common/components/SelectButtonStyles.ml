open TypedGlamor

let container ~isMenuOpen = css [
  display inlineBlock;

  select "& menu" [
    if isMenuOpen then
      display block
    else
      display none;

    position absolute;
    zIndex (int 100);
    transforms [translateX (px (-2))];
    background Colors.panelDark;
    boxShadows [(shadow ~x:(px 2) ~y:(px 2) ~blur:(px 1) (rgba 0 0 0 0.25))];

    select "& > ul > li" [
      padding (em 1.);
      cursor pointer;

      hover [
        background Colors.highlightOverlay
      ];
    ];
  ]
]