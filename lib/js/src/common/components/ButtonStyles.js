'use strict';

var Colors      = require("../styles/Colors.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var common_000 = TypedGlamor.color(Colors.text);

var common_001 = /* :: */[
  TypedGlamor.padding(TypedGlamor.em(1)),
  /* :: */[
    TypedGlamor.unsafe("cursor", "pointer"),
    /* :: */[
      TypedGlamor.select("&.m-icon-left .mdi", /* :: */[
            TypedGlamor.marginRight(TypedGlamor.em(0.25)),
            /* [] */0
          ]),
      /* :: */[
        TypedGlamor.select("&.m-icon-right .mdi", /* :: */[
              TypedGlamor.marginLeft(TypedGlamor.em(0.5)),
              /* [] */0
            ]),
        /* :: */[
          TypedGlamor.hover(/* :: */[
                TypedGlamor.background(Colors.highlightOverlay),
                /* [] */0
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

var normal = TypedGlamor.css(Pervasives.$at(common, /* :: */[
          TypedGlamor.background(Colors.panel),
          /* [] */0
        ]));

var dark = TypedGlamor.css(Pervasives.$at(common, /* :: */[
          TypedGlamor.background(Colors.panelDark),
          /* [] */0
        ]));

exports.common = common;
exports.normal = normal;
exports.dark   = dark;
/* common Not a pure module */
