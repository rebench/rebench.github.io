'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      /* Selector */Block.__(1, [
          "& > main",
          /* :: */[
            Glamor.display("flex"),
            /* :: */[
              /* Selector */Block.__(1, [
                  "& > *",
                  /* :: */[
                    Glamor.flex("1"),
                    /* :: */[
                      Glamor.width("50%"),
                      /* [] */0
                    ]
                  ]
                ]),
              /* [] */0
            ]
          ]
        ]),
      /* :: */[
        /* Selector */Block.__(1, [
            "&.s-not-even-close .score",
            /* :: */[
              Glamor.color(Colors.red),
              /* [] */0
            ]
          ]),
        /* :: */[
          /* Selector */Block.__(1, [
              "&.s-close .score",
              /* :: */[
                Glamor.color(Colors.yellow),
                /* [] */0
              ]
            ]),
          /* :: */[
            /* Selector */Block.__(1, [
                "&.s-fastest .score",
                /* :: */[
                  Glamor.color(Colors.green),
                  /* [] */0
                ]
              ]),
            /* :: */[
              /* Selector */Block.__(1, [
                  "& button.m-language-reason",
                  /* :: */[
                    Glamor.color(Colors.reason),
                    /* [] */0
                  ]
                ]),
              /* :: */[
                /* Selector */Block.__(1, [
                    "& button.m-language-ocaml",
                    /* :: */[
                      Glamor.color(Colors.ocaml),
                      /* [] */0
                    ]
                  ]),
                /* :: */[
                  /* Selector */Block.__(1, [
                      "& button.m-language-javascript",
                      /* :: */[
                        Glamor.color(Colors.javascript),
                        /* [] */0
                      ]
                    ]),
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var header = Glamor.css(/* :: */[
      Glamor.fontSize(".85em"),
      /* :: */[
        Glamor.color(Colors.text),
        /* :: */[
          Glamor.textTransform("lowercase"),
          /* :: */[
            Glamor.fontVariant("small-caps"),
            /* :: */[
              Glamor.display("flex"),
              /* :: */[
                Glamor.justifyContent("space-between"),
                /* :: */[
                  Glamor.alignItems("baseline"),
                  /* :: */[
                    /* Selector */Block.__(1, [
                        "& button",
                        /* :: */[
                          Glamor.padding(".75em"),
                          /* :: */[
                            Glamor.cursor("pointer"),
                            /* :: */[
                              /* Selector */Block.__(1, [
                                  "& .mdi:before",
                                  /* :: */[
                                    Glamor.transform("translateY(2px)"),
                                    /* :: */[
                                      Glamor.opacity(".35"),
                                      /* [] */0
                                    ]
                                  ]
                                ]),
                              /* :: */[
                                /* Selector */Block.__(1, [
                                    "&:hover",
                                    /* :: */[
                                      Glamor.background(Colors.highlightOverlay),
                                      /* [] */0
                                    ]
                                  ]),
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]),
                    /* :: */[
                      /* Selector */Block.__(1, [
                          "& > .box",
                          /* :: */[
                            Glamor.display("flex"),
                            /* :: */[
                              Glamor.flex("1"),
                              /* :: */[
                                /* Selector */Block.__(1, [
                                    "&.right",
                                    /* :: */[
                                      Glamor.justifyContent("end"),
                                      /* [] */0
                                    ]
                                  ]),
                                /* [] */0
                              ]
                            ]
                          ]
                        ]),
                      /* :: */[
                        /* Selector */Block.__(1, [
                            "& > .title",
                            /* :: */[
                              Glamor.display("inline-block"),
                              /* :: */[
                                Glamor.padding(".75em"),
                                /* :: */[
                                  Glamor.textAlign("center"),
                                  /* :: */[
                                    Glamor.flex("1"),
                                    /* [] */0
                                  ]
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

var state = Glamor.css(/* :: */[
      Glamor.padding(".75em 1em"),
      /* :: */[
        /* Selector */Block.__(1, [
            "& .mdi",
            /* :: */[
              Glamor.marginRight(".25em"),
              /* [] */0
            ]
          ]),
        /* :: */[
          /* Selector */Block.__(1, [
              "&.s-running .mdi",
              /* :: */[
                Glamor.color(Colors.yellow),
                /* [] */0
              ]
            ]),
          /* :: */[
            /* Selector */Block.__(1, [
                "&.s-complete .mdi",
                /* :: */[
                  Glamor.color(Colors.green),
                  /* [] */0
                ]
              ]),
            /* [] */0
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.header = header;
exports.state  = state;
/* root Not a pure module */
