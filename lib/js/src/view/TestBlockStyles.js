'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Colors      = require("../common/styles/Colors.js");
var Glamor      = require("bs-glamor/lib/js/src/glamor.js");
var BlockStyles = require("../common/styles/BlockStyles.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.margin("2em"),
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
              /* [] */0
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
            Glamor.marginTop(".5em"),
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

var header = BlockStyles.header;

exports.root   = root;
exports.header = header;
exports.footer = footer;
exports.state  = state;
/* root Not a pure module */
