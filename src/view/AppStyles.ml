open TypedGlamor

let container = css [
  background Colors.background;

  minHeight (vh 100.);

  unsafe "display" "flex";
  unsafe "flexDirection" "column";
  
  select "& > footer" [
    background Colors.darkBackground;

    padding3 ~top:(em 1.) ~h:zero ~bottom:(em 2.);
    marginTop auto;

    select "& > div" [ (* matches the inner width container *)
      unsafe "display" "flex";

      select "& > section" [
        margin2 ~v:zero ~h:(em 2.);
        unsafe "opacity" ".5";
        transitions [AnimatableProperty.opacity, (ms 500), easeInOut, (ms 0)];

        hover [
          unsafe "opacity" "1";
        ];

        select "& h1" [
          unsafe "fontSize" ".85em";
          color (rgba 255 255 255 0.5);
          unsafe "textTransform" "lowercase";
          unsafe "fontVariant" "small-caps";
          marginBottom (em 0.35);
        ];

        select "& a" [
          color Colors.text;
          unsafe "textDecoration" "none";
          unsafe "fontSize" ".85rem";

          hover [
            color white;
          ];
        ];
      ];
    ];
  ]
]

