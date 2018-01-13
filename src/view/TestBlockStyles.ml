open TypedGlamor

let container ~(testState: Test.state) ~language = css [

  select "& > header" [
    unsafe "fontSize" ".85em";
    color Colors.text;
    unsafe "textTransform" "lowercase";
    unsafe "fontVariant" "small-caps";
    unsafe "display" "flex";
    unsafe "justifyContent" "space-between";
    unsafe "alignItems" "baseline";

    select "& button" [
      padding (em 0.75);
      unsafe "cursor" "pointer";

      select "& .mdi:before" [
        unsafe "transform" "translateY(2px)"; (* alignment fix due to the lowercase small-caps styling *)
        unsafe "opacity" ".35";
      ];

      hover [
        background Colors.highlightOverlay;
      ];

      select "&.language-button" [
        match language with
        | `JS -> color Colors.javascript
        | `RE -> color Colors.reason
        | `ML -> color Colors.ocaml
      ]
    ];

    select "& > .box" [
      unsafe "display" "flex";
      unsafe "flex" "1";

      select "&.right" [
        unsafe "justifyContent" "flex-end";
      ];
    ];

    select "& > .title" [
      display inlineBlock;
      padding (em 0.75);
      unsafe "textAlign" "center";
      unsafe "flex" "1";
    ];

    select "& .score" [
      match testState with
      | Complete(_, Some(s)) when s == 0.   -> color Colors.green
      | Complete(_, Some(s)) when s >= -10. -> color Colors.yellow
      | Complete(_, Some(s)) when s <= -50. -> color Colors.red
      | _ -> unsafe "nothing" "";
    ];
  ];

  select "& > main" [
    unsafe "display" "flex";

    select "& > *" [
      unsafe "flex" "1";
      width (pct 50.);
    ];
  ];

  select "& > footer" [
    select "& > .state" [
      padding2 ~v:(em 0.75) ~h:(em 1.);

      select "& .mdi" [
        marginRight (em 0.25);

        match testState with
        | Running(_)  -> color Colors.yellow
        | Error(_)    -> color Colors.red
        | Complete(_) -> color Colors.green
        | _           -> unsafe "nothing" ""
      ];
    ]
  ]
]

