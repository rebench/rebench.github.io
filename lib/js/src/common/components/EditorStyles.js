'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      /* Selector */Block.__(1, [
          "& .CodeMirror",
          /* :: */[
            Glamor.height("auto"),
            /* :: */[
              Glamor.fontFamily("\"SFMono-Regular\", Consolas,\"Roboto Mono\",\"Droid Sans Mono\",\"Liberation Mono\",Menlo,Courier,monospace"),
              /* :: */[
                Glamor.fontSize("14px"),
                /* [] */0
              ]
            ]
          ]
        ]),
      /* :: */[
        /* Selector */Block.__(1, [
            "& .CodeMirror .syntax-error",
            /* :: */[
              Glamor.background("#EC5F67"),
              /* :: */[
                Glamor.color("black"),
                /* [] */0
              ]
            ]
          ]),
        /* [] */0
      ]
    ]);

exports.root = root;
/* root Not a pure module */
