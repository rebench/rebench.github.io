'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.background),
      /* :: */[
        Glamor.minHeight("100vh"),
        /* :: */[
          Glamor.display("flex"),
          /* :: */[
            Glamor.flexDirection("column"),
            /* [] */0
          ]
        ]
      ]
    ]);

var footer = Glamor.css(/* :: */[
      Glamor.background(Colors.darkBackground),
      /* :: */[
        Glamor.padding("1em 0 2em"),
        /* :: */[
          Glamor.marginTop("auto"),
          /* :: */[
            Glamor.display("flex"),
            /* :: */[
              /* Selector */Block.__(1, [
                  "& > section",
                  /* :: */[
                    Glamor.margin("0 2em"),
                    /* :: */[
                      Glamor.opacity(".5"),
                      /* :: */[
                        Glamor.transition("opacity .5s"),
                        /* :: */[
                          /* Selector */Block.__(1, [
                              "&:hover",
                              /* :: */[
                                Glamor.opacity("1"),
                                /* [] */0
                              ]
                            ]),
                          /* :: */[
                            /* Selector */Block.__(1, [
                                "& h1",
                                /* :: */[
                                  Glamor.fontSize(".85em"),
                                  /* :: */[
                                    Glamor.color("rgba(255, 255, 255, .5)"),
                                    /* :: */[
                                      Glamor.textTransform("lowercase"),
                                      /* :: */[
                                        Glamor.fontVariant("small-caps"),
                                        /* :: */[
                                          Glamor.marginBottom(".35em"),
                                          /* [] */0
                                        ]
                                      ]
                                    ]
                                  ]
                                ]
                              ]),
                            /* :: */[
                              /* Selector */Block.__(1, [
                                  "& a",
                                  /* :: */[
                                    Glamor.color(Colors.text),
                                    /* :: */[
                                      Glamor.textDecoration("none"),
                                      /* :: */[
                                        Glamor.fontSize(".85rem"),
                                        /* :: */[
                                          /* Selector */Block.__(1, [
                                              "&:hover",
                                              /* :: */[
                                                Glamor.color("white"),
                                                /* [] */0
                                              ]
                                            ]),
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
                ]),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.footer = footer;
/* root Not a pure module */
