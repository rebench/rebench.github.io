'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var container = TypedGlamor.css(/* :: */[
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
                /* :: */[
                  TypedGlamor.select("& > .separator", /* :: */[
                        TypedGlamor.unsafe("flexGrow", "1"),
                        /* [] */0
                      ]),
                  /* [] */0
                ]
              ]
            ]),
        /* [] */0
      ]
    ]);

exports.container = container;
/* container Not a pure module */
