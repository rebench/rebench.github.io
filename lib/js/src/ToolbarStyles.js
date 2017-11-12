'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background("#263238"),
      /* [] */0
    ]);

var button = Glamor.css(/* :: */[
      Glamor.background("#263238"),
      /* :: */[
        Glamor.color("#aaa"),
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
                    Glamor.background("#364248"),
                    /* [] */0
                  ]
                ]),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.button = button;
/* root Not a pure module */
