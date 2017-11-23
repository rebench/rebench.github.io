'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("./Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.margin("1em"),
        /* :: */[
          Glamor.paddingBottom(".5em"),
          /* [] */0
        ]
      ]
    ]);

var header = Glamor.css(/* :: */[
      Glamor.padding(".75em 1.25em"),
      /* :: */[
        Glamor.marginBottom(".5em"),
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
    ]);

var clickableHeader = Glamor.css(/* :: */[
      Glamor.padding(".75em 1.25em"),
      /* :: */[
        Glamor.marginBottom(".5em"),
        /* :: */[
          Glamor.fontSize(".85em"),
          /* :: */[
            Glamor.color(Colors.text),
            /* :: */[
              Glamor.textTransform("lowercase"),
              /* :: */[
                Glamor.fontVariant("small-caps"),
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
              ]
            ]
          ]
        ]
      ]
    ]);

exports.root            = root;
exports.header          = header;
exports.clickableHeader = clickableHeader;
/* root Not a pure module */
