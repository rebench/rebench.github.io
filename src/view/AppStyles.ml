open TypedGlamor

let container = css [
  background Colors.background;

  minHeight (vh 100.);

  display flex;
  flexDirection column;
  
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
  ]
]

