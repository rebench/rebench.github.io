'use strict';

var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background("#263238"),
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
        Glamor.fontSize(".85em"),
        /* :: */[
          Glamor.color("#162228"),
          /* :: */[
            Glamor.color("#aaa"),
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

exports.root   = root;
exports.header = header;
/* root Not a pure module */
