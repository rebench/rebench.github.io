open TypedGlamor

let container ~preventScroll = css [
  background Colors.background;

  height (vh 100.);

  display flex;
  flexDirection column;

  select "& > .scroll-container" [
    height (pct 100.);
    display flex;
    flexDirection column;

    if preventScroll then
      overflow hidden
    else
      overflow auto;
  
    select "& > footer" [
      background Colors.darkBackground;

      padding3 ~top:(em 1.) ~h:zero ~bottom:(em 2.);
      marginTop auto;

      select "& > div" [ (* matches the inner width container *)
        display flex;

        select "& > section" [
          margin2 ~v:zero ~h:(em 2.);
          opacity 0.5;
          transitions [AnimatableProperty.opacity, (ms 500), easeInOut, (ms 0)];

          hover [
            opacity 1.;
          ];

          select "& h1" [
            fontSize (em 0.85);
            color (rgba 255 255 255 0.5);
            textTransform lowercase;
            fontVariant smallCaps;
            marginBottom (em 0.35);
          ];

          select "& a" [
            color Colors.text;
            textDecoration none;
            fontSize (rem 0.85);

            hover [
              color white;
            ];
          ];
        ];
      ];
    ];
  ];

  select "& > .mask" [
    position fixed;
    zIndex (int 10);
    offsetTop zero;
    height (vh 100.);
    width (vw 100.);
    background (rgba 0 0 0 0.5)
  ];
]

