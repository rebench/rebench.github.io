'use strict';

var Block      = require("bs-platform/lib/js/block.js");
var Colors     = require("../styles/Colors.js");
var Glamor     = require("bs-glamor/lib/js/src/glamor.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

var common_000 = Glamor.color(Colors.text);

var common_001 = /* :: */[
  Glamor.padding("1em"),
  /* :: */[
    Glamor.cursor("pointer"),
    /* :: */[
      /* Selector */Block.__(1, [
          "&.m-icon-left .mdi",
          /* :: */[
            Glamor.marginRight(".25em"),
            /* [] */0
          ]
        ]),
      /* :: */[
        /* Selector */Block.__(1, [
            "&.m-icon-right .mdi",
            /* :: */[
              Glamor.marginLeft(".5em"),
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
];

var common = /* :: */[
  common_000,
  common_001
];

var normal = Glamor.css(Pervasives.$at(common, /* :: */[
          Glamor.background(Colors.panel),
          /* [] */0
        ]));

var dark = Glamor.css(Pervasives.$at(common, /* :: */[
          Glamor.background(Colors.panelDark),
          /* [] */0
        ]));

exports.common = common;
exports.normal = normal;
exports.dark   = dark;
/* common Not a pure module */
