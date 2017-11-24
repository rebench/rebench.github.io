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
          /* [] */0
        ]
      ]
    ]);

var header = Glamor.css(/* :: */[
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
    ]);

var clickableHeader = Glamor.css(/* :: */[
      Glamor.padding(".75em 1.25em"),
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
    ]);

var content = Glamor.css(/* :: */[
      Glamor.marginTop(".5em"),
      /* :: */[
        Glamor.marginBottom(".5em"),
        /* [] */0
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

exports.root            = root;
exports.header          = header;
exports.clickableHeader = clickableHeader;
exports.content         = content;
exports.footer          = footer;
/* root Not a pure module */
