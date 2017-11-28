'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Colors = require("../common/styles/Colors.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.display("flex"),
        /* :: */[
          /* Selector */Block.__(1, [
              "& > .logo",
              /* :: */[
                Glamor.width("45px"),
                /* :: */[
                  Glamor.objectFit("contain"),
                  /* :: */[
                    Glamor.objectPosition("left"),
                    /* [] */0
                  ]
                ]
              ]
            ]),
          /* [] */0
        ]
      ]
    ]);

var separator = Glamor.css(/* :: */[
      Glamor.flexGrow("1"),
      /* [] */0
    ]);

exports.root      = root;
exports.separator = separator;
/* root Not a pure module */
