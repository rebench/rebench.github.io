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
    unsafe "transform" "translateX(-2px)";
    background Colors.panelDark;
    unsafe "boxShadow" "2px 2px 1px 0 rgba(0, 0, 0, .25)";

    select "& > ul > li" [
      padding (em 1.);
      unsafe "cursor" "pointer";

      hover [
        background Colors.highlightOverlay
      ];
    ];
  ]
]