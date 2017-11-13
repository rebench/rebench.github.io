'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("./Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var button = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.color(Colors.text),
        /* :: */[
          Glamor.padding("1em"),
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
    ]);

exports.button = button;
/* button Not a pure module */
