'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function container(testState, language) {
  var tmp;
  if (typeof testState === "number") {
    tmp = TypedGlamor.nothing;
  } else if (testState.tag === 2) {
    var match = testState[1];
    if (match) {
      var s = match[0];
      tmp = s === 0 ? TypedGlamor.color(Colors.green) : (
          s >= -10 ? TypedGlamor.color(Colors.yellow) : (
              s <= -50 ? TypedGlamor.color(Colors.red) : TypedGlamor.nothing
            )
        );
    } else {
      tmp = TypedGlamor.nothing;
    }
  } else {
    tmp = TypedGlamor.nothing;
  }
  var tmp$1;
  if (typeof testState === "number") {
    tmp$1 = TypedGlamor.nothing;
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
                    TypedGlamor.fontSize(TypedGlamor.em(0.85)),
                    /* :: */[
                      TypedGlamor.color(Colors.text),
                      /* :: */[
                        TypedGlamor.textTransform(TypedGlamor.lowercase),
                        /* :: */[
                          TypedGlamor.fontVariant(TypedGlamor.smallCaps),
                          /* :: */[
                            TypedGlamor.display(TypedGlamor.flex),
                            /* :: */[
                              TypedGlamor.justifyContent(TypedGlamor.spaceBetween),
                              /* :: */[
                                TypedGlamor.alignItems(TypedGlamor.baseline),
                                /* :: */[
                                  TypedGlamor.select("& button", /* :: */[
                                        TypedGlamor.padding(TypedGlamor.em(0.75)),
                                        /* :: */[
                                          TypedGlamor.cursor(TypedGlamor.pointer),
                                          /* :: */[
                                            TypedGlamor.select("& .mdi:before", /* :: */[
                                                  TypedGlamor.transforms(/* :: */[
                                                        TypedGlamor.translateY(TypedGlamor.px(2)),
                                                        /* [] */0
                                                      ]),
                                                  /* :: */[
                                                    TypedGlamor.opacity(0.35),
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
                                          TypedGlamor.display(TypedGlamor.flex),
                                          /* :: */[
                                            TypedGlamor.flex_(TypedGlamor.$$int(1)),
                                            /* :: */[
                                              TypedGlamor.select("&.right", /* :: */[
                                                    TypedGlamor.justifyContent(TypedGlamor.flexEnd),
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
                                                TypedGlamor.textAlign(TypedGlamor.center),
                                                /* :: */[
                                                  TypedGlamor.flex_(TypedGlamor.$$int(1)),
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
                      TypedGlamor.display(TypedGlamor.flex),
                      /* :: */[
                        TypedGlamor.select("& > *", /* :: */[
                              TypedGlamor.flex_(TypedGlamor.$$int(1)),
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
