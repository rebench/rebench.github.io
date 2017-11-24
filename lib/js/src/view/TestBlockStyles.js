'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
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

exports.root  = root;
exports.state = state;
/* root Not a pure module */
