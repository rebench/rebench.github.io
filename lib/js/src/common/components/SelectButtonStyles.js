'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.display("inline-block"),
      /* [] */0
    ]);

var menu = Glamor.css(/* :: */[
      Glamor.position("absolute"),
      /* :: */[
        Glamor.zIndex("100"),
        /* :: */[
          Glamor.display("none"),
          /* :: */[
            Glamor.transform("translateX(-2px)"),
            /* :: */[
              Glamor.background(Colors.panel),
              /* :: */[
                Glamor.borderTop("1px solid" + Colors.background),
                /* :: */[
                  Glamor.boxShadow("2px 2px 1px 0 rgba(0, 0, 0, .25)"),
                  /* :: */[
                    /* Selector */Block.__(1, [
                        "&.s-open",
                        /* :: */[
                          Glamor.display("block"),
                          /* [] */0
                        ]
                      ]),
                    /* :: */[
                      /* Selector */Block.__(1, [
                          "& > ul > li",
                          /* :: */[
                            Glamor.padding("1em"),
                            /* :: */[
                              Glamor.cursor("pointer"),
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
    ]);

exports.root = root;
exports.menu = menu;
/* root Not a pure module */
