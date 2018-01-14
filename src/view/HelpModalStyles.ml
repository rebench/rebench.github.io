open! TypedGlamor

let container = css [
  display flex;
  flexDirection column;
  maxHeight (vh 85.);
  margin (em 2.);
  background Colors.panel;
  color Colors.text;
  boxShadows [shadow ~x:(em 1.) ~y:(em 1.) ~blur:(em 1.) (rgba 0 0 0 0.1)];
  borderRadius (em 0.25);

  select "> header" [
    display flex;
    alignItems baseline;
    paddingLeft (em 2.);
    borderBottom3 (px 1) solid Colors.panelDark;
    textTransform lowercase;
    fontVariant smallCaps;

    select "> button" [
      marginLeft auto;
    ]
  ];

  select "> main" [
    padding2 ~v:(em 1.5) ~h:(em 2.);
    overflow auto;

    select "& p" [
      marginTop (em 1.45);

      select ":first-child" [
        marginTop zero;
      ]
    ];

    select "& .brand" [
      color Colors.reason;
    ];

    select "& em" [
      color white;
    ];

    select "& code" [
      fontFamilies [monospace];
    ];

    select "& a" [
      color Colors.text;
      textDecoration underline;
      fontStyle italic;
      transitions [AnimatableProperty.color, (ms 150), easeInOut, (ms 0)];

      hover [
        color white;
      ]
    ]
  ];
]