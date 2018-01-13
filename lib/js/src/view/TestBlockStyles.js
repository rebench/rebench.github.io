'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function container(testState, language) {
  var tmp;
  if (typeof testState === "number") {
    tmp = TypedGlamor.unsafe("nothing", "");
  } else if (testState.tag === 2) {
    var match = testState[1];
    if (match) {
      var s = match[0];
      tmp = s === 0 ? TypedGlamor.color(Colors.green) : (
          s >= -10 ? TypedGlamor.color(Colors.yellow) : (
              s <= -50 ? TypedGlamor.color(Colors.red) : TypedGlamor.unsafe("nothing", "")
            )
        );
    } else {
      tmp = TypedGlamor.unsafe("nothing", "");
    }
  } else {
    tmp = TypedGlamor.unsafe("nothing", "");
  }
  var tmp$1;
  if (typeof testState === "number") {
    tmp$1 = TypedGlamor.unsafe("nothing", "");
  } else {
    switch (testState.tag | 0) {
      case 0 : 
          tmp$1 = TypedGlamor.color(Colors.yellow);
          break;
      case 1 : 
          tmp$1 = TypedGlamor.color(Colors.red);
          break;
      case 2 : 
          tmp$1 = TypedGlamor.color(Colors.green);
          break;
      
    }
  }
  return TypedGlamor.css(/* :: */[
              TypedGlamor.select("& > header", /* :: */[
                    TypedGlamor.unsafe("fontSize", ".85em"),
                    /* :: */[
                      TypedGlamor.color(Colors.text),
                      /* :: */[
                        TypedGlamor.unsafe("textTransform", "lowercase"),
                        /* :: */[
                          TypedGlamor.unsafe("fontVariant", "small-caps"),
                          /* :: */[
                            TypedGlamor.unsafe("display", "flex"),
                            /* :: */[
                              TypedGlamor.unsafe("justifyContent", "space-between"),
                              /* :: */[
                                TypedGlamor.unsafe("alignItems", "baseline"),
                                /* :: */[
                                  TypedGlamor.select("& button", /* :: */[
                                        TypedGlamor.padding(TypedGlamor.em(0.75)),
                                        /* :: */[
                                          TypedGlamor.unsafe("cursor", "pointer"),
                                          /* :: */[
                                            TypedGlamor.select("& .mdi:before", /* :: */[
                                                  TypedGlamor.unsafe("transform", "translateY(2px)"),
                                                  /* :: */[
                                                    TypedGlamor.unsafe("opacity", ".35"),
                                                    /* [] */0
                                                  ]
                                                ]),
                                            /* :: */[
                                              TypedGlamor.hover(/* :: */[
                                                    TypedGlamor.background(Colors.highlightOverlay),
                                                    /* [] */0
                                                  ]),
                                              /* :: */[
                                                TypedGlamor.select("&.language-button", /* :: */[
                                                      language !== 17247 ? (
                                                          language >= 18355 ? TypedGlamor.color(Colors.reason) : TypedGlamor.color(Colors.javascript)
                                                        ) : TypedGlamor.color(Colors.ocaml),
                                                      /* [] */0
                                                    ]),
                                                /* [] */0
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]),
                                  /* :: */[
                                    TypedGlamor.select("& > .box", /* :: */[
                                          TypedGlamor.unsafe("display", "flex"),
                                          /* :: */[
                                            TypedGlamor.unsafe("flex", "1"),
                                            /* :: */[
                                              TypedGlamor.select("&.right", /* :: */[
                                                    TypedGlamor.unsafe("justifyContent", "flex-end"),
                                                    /* [] */0
                                                  ]),
                                              /* [] */0
                                            ]
                                          ]
                                        ]),
                                    /* :: */[
                                      TypedGlamor.select("& > .title", /* :: */[
                                            TypedGlamor.display(TypedGlamor.inlineBlock),
                                            /* :: */[
                                              TypedGlamor.padding(TypedGlamor.em(0.75)),
                                              /* :: */[
                                                TypedGlamor.unsafe("textAlign", "center"),
                                                /* :: */[
                                                  TypedGlamor.unsafe("flex", "1"),
                                                  /* [] */0
                                                ]
                                              ]
                                            ]
                                          ]),
                                      /* :: */[
                                        TypedGlamor.select("& .score", /* :: */[
                                              tmp,
                                              /* [] */0
                                            ]),
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]),
              /* :: */[
                TypedGlamor.select("& > main", /* :: */[
                      TypedGlamor.unsafe("display", "flex"),
                      /* :: */[
                        TypedGlamor.select("& > *", /* :: */[
                              TypedGlamor.unsafe("flex", "1"),
                              /* :: */[
                                TypedGlamor.width(TypedGlamor.pct(50)),
                                /* [] */0
                              ]
                            ]),
                        /* [] */0
                      ]
                    ]),
                /* :: */[
                  TypedGlamor.select("& > footer", /* :: */[
                        TypedGlamor.select("& > .state", /* :: */[
                              TypedGlamor.padding2(TypedGlamor.em(0.75), TypedGlamor.em(1)),
                              /* :: */[
                                TypedGlamor.select("& .mdi", /* :: */[
                                      TypedGlamor.marginRight(TypedGlamor.em(0.25)),
                                      /* :: */[
                                        tmp$1,
                                        /* [] */0
                                      ]
                                    ]),
                                /* [] */0
                              ]
                            ]),
                        /* [] */0
                      ]),
                  /* [] */0
                ]
              ]
            ]);
}

exports.container = container;
/* Colors Not a pure module */
