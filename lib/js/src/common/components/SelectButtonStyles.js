'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function container(isMenuOpen) {
  return TypedGlamor.css(/* :: */[
              TypedGlamor.display(TypedGlamor.inlineBlock),
              /* :: */[
                TypedGlamor.select("& menu", /* :: */[
                      isMenuOpen ? TypedGlamor.display(TypedGlamor.block) : TypedGlamor.display(TypedGlamor.none),
                      /* :: */[
                        TypedGlamor.position(TypedGlamor.absolute),
                        /* :: */[
                          TypedGlamor.zIndex(TypedGlamor.$$int(100)),
                          /* :: */[
                            TypedGlamor.transforms(/* :: */[
                                  TypedGlamor.translateX(TypedGlamor.px(-2)),
                                  /* [] */0
                                ]),
                            /* :: */[
                              TypedGlamor.background(Colors.panelDark),
                              /* :: */[
                                TypedGlamor.boxShadows(/* :: */[
                                      TypedGlamor.shadow(TypedGlamor.px(2), TypedGlamor.px(2), /* Some */[TypedGlamor.px(1)], /* None */0, /* None */0, TypedGlamor.rgba(0, 0, 0, 0.25)),
                                      /* [] */0
                                    ]),
                                /* :: */[
                                  TypedGlamor.select("& > ul > li", /* :: */[
                                        TypedGlamor.padding(TypedGlamor.em(1)),
                                        /* :: */[
                                          TypedGlamor.cursor(TypedGlamor.pointer),
                                          /* :: */[
                                            TypedGlamor.hover(/* :: */[
                                                  TypedGlamor.background(Colors.highlightOverlay),
                                                  /* [] */0
                                                ]),
                                            /* [] */0
                                          ]
                                        ]
                                      ]),
                                  /* [] */0
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]),
                /* [] */0
              ]
            ]);
}

exports.container = container;
/* Colors Not a pure module */
