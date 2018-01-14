'use strict';

var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var container = TypedGlamor.css(/* :: */[
      TypedGlamor.select("& .CodeMirror", /* :: */[
            TypedGlamor.height(TypedGlamor.auto),
            /* :: */[
              TypedGlamor.fontFamilies(/* :: */[
                    "SFMono-Regular",
                    /* :: */[
                      "Consolas",
                      /* :: */[
                        "Roboto Mono",
                        /* :: */[
                          "Droid Sans Mono",
                          /* :: */[
                            "Liberation Mono",
                            /* :: */[
                              "Menlo,Courier",
                              /* :: */[
                                TypedGlamor.monospace,
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]),
              /* :: */[
                TypedGlamor.fontSize(TypedGlamor.px(14)),
                /* [] */0
              ]
            ]
          ]),
      /* :: */[
        TypedGlamor.select("& .CodeMirror .syntax-error", /* :: */[
              TypedGlamor.background(TypedGlamor.hex(15490919)),
              /* :: */[
                TypedGlamor.color(TypedGlamor.black),
                /* [] */0
              ]
            ]),
        /* [] */0
      ]
    ]);

exports.container = container;
/* container Not a pure module */
