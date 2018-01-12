'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
      TypedGlamor.background(Colors.panel),
      /* :: */[
        TypedGlamor.select("& > div", /* :: */[
              TypedGlamor.unsafe("display", "flex"),
              /* :: */[
                TypedGlamor.select("& > .logo", /* :: */[
                      TypedGlamor.width(TypedGlamor.px(45)),
                      /* :: */[
                        TypedGlamor.unsafe("objectFit", "contain"),
                        /* :: */[
                          TypedGlamor.unsafe("objectPosition", "left"),
                          /* [] */0
                        ]
                      ]
                    ]),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

var separator = TypedGlamor.css(/* :: */[
      TypedGlamor.unsafe("flexGrow", "1"),
      /* [] */0
    ]);

exports.root      = root;
exports.separator = separator;
/* root Not a pure module */
