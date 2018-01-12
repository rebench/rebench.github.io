open TypedGlamor

let root = css [
  background Colors.panel;

  select "& > div" [ (* matches the inner width container *)
    unsafe "display" "flex";

    select "& > .logo" [
      width (px 45);
      unsafe "objectFit" "contain";
      unsafe "objectPosition" "left";
    ];
  ];
]

let separator = css [
  unsafe "flexGrow" "1";
]