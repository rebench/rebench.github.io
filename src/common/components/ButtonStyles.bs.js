'use strict';

var Colors = require("../styles/Colors.bs.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");

function root(kind, alignIcon) {
  return TypedGlamor.css(/* None */0, /* :: */[
              TypedGlamor.color(Colors.text),
              /* :: */[
                TypedGlamor.padding(TypedGlamor.em(1)),
                /* :: */[
                  TypedGlamor.cursor(TypedGlamor.pointer),
                  /* :: */[
                    TypedGlamor.background(kind >= 758939798 ? Colors.panelDark : Colors.panel),
                    /* :: */[
                      TypedGlamor.select("& .mdi", /* :: */[
                            alignIcon === /* Left */847852583 ? TypedGlamor.marginRight(TypedGlamor.em(0.25)) : TypedGlamor.marginLeft(TypedGlamor.em(0.5)),
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
              ]
            ]);
}

exports.root = root;
/* Colors Not a pure module */
