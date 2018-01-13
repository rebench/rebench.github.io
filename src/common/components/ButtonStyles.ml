open TypedGlamor

let root kind alignIcon = css [
  color Colors.text;
  padding (em 1.);
  unsafe "cursor" "pointer";

  background (
    match kind with
    | `Normal -> Colors.panel
    | `Dark   -> Colors.panelDark
  );

  select "& .mdi" [
    if alignIcon = `Left then
      marginRight (em 0.25)
    else
      marginLeft (em 0.5)
  ];

  hover [
    background Colors.highlightOverlay;
  ];
]