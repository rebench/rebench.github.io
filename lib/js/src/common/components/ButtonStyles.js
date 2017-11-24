'use strict';

var Block      = require("bs-platform/lib/js/block.js");
var Colors     = require("../styles/Colors.js");
var Glamor     = require("bs-glamor/lib/js/src/glamor.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

var common_000 = Glamor.background("red");

var common_001 = /* :: */[
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
