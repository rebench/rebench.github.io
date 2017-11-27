'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.overflow("auto"),
        /* :: */[
          Glamor.margin("1em"),
          /* :: */[
            Glamor.borderLeft("2px solid transparent"),
            /* :: */[
              /* Selector */Block.__(1, [
                  "& > header",
                  /* :: */[
                    Glamor.padding(".75em 1.25em"),
                    /* :: */[
                      Glamor.fontSize(".85em"),
                      /* :: */[
                        Glamor.color(Colors.text),
                        /* :: */[
                          Glamor.textTransform("lowercase"),
                          /* :: */[
                            Glamor.fontVariant("small-caps"),
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]
                ]),
              /* :: */[
                /* Selector */Block.__(1, [
                    "&.collapsible > header",
                    /* :: */[
                      /* Selector */Block.__(1, [
                          "&:hover",
                          /* :: */[
                            Glamor.background(Colors.panelDark),
                            /* :: */[
                              Glamor.cursor("pointer"),
                              /* [] */0
                            ]
                          ]
                        ]),
                      /* [] */0
                    ]
                  ]),
                /* :: */[
                  /* Selector */Block.__(1, [
                      "& > main",
                      /* :: */[
                        Glamor.marginTop(".5em"),
                        /* :: */[
                          Glamor.marginBottom(".5em"),
                          /* [] */0
                        ]
                      ]
                    ]),
                  /* :: */[
                    /* Selector */Block.__(1, [
                        "&.s-collapsed > main",
                        /* :: */[
                          Glamor.display("none"),
                          /* [] */0
                        ]
                      ]),
                    /* :: */[
                      /* Selector */Block.__(1, [
                          "&.s-error",
                          /* :: */[
                            Glamor.borderLeft("2px solid " + Colors.red),
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
        ]
      ]
    ]);

var footer = Glamor.css(/* :: */[
      Glamor.display("flex"),
      /* :: */[
        Glamor.background(Colors.panelDark),
        /* :: */[
          Glamor.color(Colors.text),
          /* :: */[
            /* Selector */Block.__(1, [
                "& button",
                /* :: */[
                  Glamor.padding(".75em 1em"),
                  /* [] */0
                ]
              ]),
            /* [] */0
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.footer = footer;
/* root Not a pure module */
