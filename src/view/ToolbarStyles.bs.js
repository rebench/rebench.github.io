'use strict';

var Colors = require("../common/styles/Colors.bs.js");
var TypedGlamor = require("bs-typed-glamor/src/TypedGlamor.bs.js");

var container = TypedGlamor.css(/* None */0, /* :: */[
      TypedGlamor.background(Colors.panel),
      /* :: */[
        TypedGlamor.select("& > div", /* :: */[
              TypedGlamor.display(TypedGlamor.flex),
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
                        TypedGlamor.flex_(TypedGlamor.auto),
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
