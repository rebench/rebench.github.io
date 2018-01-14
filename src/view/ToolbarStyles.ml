open TypedGlamor

let container = css [
  background Colors.panel;

  select "& > div" [ (* matches the inner width container *)
    display flex;

    select "& > .logo" [
      width (px 45);
      unsafe "objectFit" "contain";
      unsafe "objectPosition" "left";
    ];

    select "& > .separator" [
      flex_ auto;
    ]
  ];
]