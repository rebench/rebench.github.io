'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
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
        TypedGlamor.select("&.s-not-even-close .score", /* :: */[
              TypedGlamor.color(Colors.red),
              /* [] */0
            ]),
        /* :: */[
          TypedGlamor.select("&.s-close .score", /* :: */[
                TypedGlamor.color(Colors.yellow),
                /* [] */0
              ]),
          /* :: */[
            TypedGlamor.select("&.s-fastest .score", /* :: */[
                  TypedGlamor.color(Colors.green),
                  /* [] */0
                ]),
            /* :: */[
              TypedGlamor.select("& button.m-language-reason", /* :: */[
                    TypedGlamor.color(Colors.reason),
                    /* [] */0
                  ]),
              /* :: */[
                TypedGlamor.select("& button.m-language-ocaml", /* :: */[
                      TypedGlamor.color(Colors.ocaml),
                      /* [] */0
                    ]),
                /* :: */[
                  TypedGlamor.select("& button.m-language-javascript", /* :: */[
                        TypedGlamor.color(Colors.javascript),
                        /* [] */0
                      ]),
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var header = TypedGlamor.css(/* :: */[
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
                                /* [] */0
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
    ]);

var state = TypedGlamor.css(/* :: */[
      TypedGlamor.padding2(TypedGlamor.em(0.75), TypedGlamor.em(1)),
      /* :: */[
        TypedGlamor.select("& .mdi", /* :: */[
              TypedGlamor.marginRight(TypedGlamor.em(0.25)),
              /* [] */0
            ]),
        /* :: */[
          TypedGlamor.select("&.s-running .mdi", /* :: */[
                TypedGlamor.color(Colors.yellow),
                /* [] */0
              ]),
          /* :: */[
            TypedGlamor.select("&.s-error .mdi", /* :: */[
                  TypedGlamor.color(Colors.red),
                  /* [] */0
                ]),
            /* :: */[
              TypedGlamor.select("&.s-complete .mdi", /* :: */[
                    TypedGlamor.color(Colors.green),
                    /* [] */0
                  ]),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.header = header;
exports.state  = state;
/* root Not a pure module */
