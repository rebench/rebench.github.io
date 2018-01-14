open TypedGlamor

let container ~(testState: Test.state) ~language = css [

  select "& > header" [
    fontSize (em 0.85);
    color Colors.text;
    textTransform lowercase;
    fontVariant smallCaps;
    display flex;
    justifyContent spaceBetween;
    alignItems baseline;

    select "& button" [
      padding (em 0.75);
      cursor pointer;

      select "& .mdi:before" [
        transforms [translateY (px 2)]; (* alignment fix due to the lowercase small-caps styling *)
        opacity 0.35;
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
      display flex;
      flex_ (int 1);

      select "&.right" [
        justifyContent flexEnd;
      ];
    ];

    select "& > .title" [
      display inlineBlock;
      padding (em 0.75);
      textAlign center;
      flex_ (int 1);
    ];

    select "& .score" [
      match testState with
      | Complete(_, Some(s)) when s == 0.   -> color Colors.green
      | Complete(_, Some(s)) when s >= -10. -> color Colors.yellow
      | Complete(_, Some(s)) when s <= -50. -> color Colors.red
      | _                                   -> nothing;
    ];
  ];

  select "& > main" [
    display flex;
    overflow hidden;

    select "& > *" [
      flex_ auto;
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
        | _           -> nothing
      ];
    ]
  ]
]

