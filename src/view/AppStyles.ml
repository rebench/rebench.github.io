open Glamor

let root = css [
  background Colors.background;

  minHeight "100vh";

  display "flex";
  flexDirection "column";
]

let footer = css [
  background Colors.darkBackground;

  padding "1em 0 2em";
  marginTop "auto";

  Selector("& > div", [ (* matches the inner width container *)
    display "flex";

    Selector("& > section", [
      margin "0 2em";
      opacity ".5";
      transition "opacity .5s";

      Selector("&:hover", [
        opacity "1";
      ]);

      Selector("& h1", [
        fontSize ".85em";
        color "rgba(255, 255, 255, .5)";
        textTransform "lowercase";
        fontVariant "small-caps";
        marginBottom ".35em";
      ]);

      Selector("& a", [
        color Colors.text;
        textDecoration "none";
        fontSize ".85rem";

        Selector ("&:hover", [
          color "white";
        ]);
      ]);
    ]);
  ]);
]
