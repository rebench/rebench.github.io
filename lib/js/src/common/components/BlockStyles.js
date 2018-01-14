'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

function container(isCollapsible, isCollapsed) {
  return TypedGlamor.css(/* :: */[
              TypedGlamor.label("block"),
              /* :: */[
                TypedGlamor.background(Colors.panel),
                /* :: */[
                  TypedGlamor.overflow(TypedGlamor.auto),
                  /* :: */[
                    TypedGlamor.margin2(TypedGlamor.em(1), TypedGlamor.zero),
                    /* :: */[
                      TypedGlamor.borderLeft3(TypedGlamor.px(2), TypedGlamor.solid, TypedGlamor.transparent),
                      /* :: */[
                        isCollapsible ? TypedGlamor.select("& > header", /* :: */[
                                TypedGlamor.hover(/* :: */[
                                      TypedGlamor.background(Colors.panelDark),
                                      /* :: */[
                                        TypedGlamor.cursor(TypedGlamor.pointer),
                                        /* [] */0
                                      ]
                                    ]),
                                /* [] */0
                              ]) : TypedGlamor.select("&", /* [] */0),
                        /* :: */[
                          TypedGlamor.select("& > main", /* :: */[
                                TypedGlamor.marginTop(TypedGlamor.em(0.5)),
                                /* :: */[
                                  TypedGlamor.marginBottom(TypedGlamor.em(0.5)),
                                  /* [] */0
                                ]
                              ]),
                          /* :: */[
                            isCollapsed ? TypedGlamor.select("& > main", /* :: */[
                                    TypedGlamor.display(TypedGlamor.none),
                                    /* [] */0
                                  ]) : TypedGlamor.select("&", /* [] */0),
                            /* :: */[
                              TypedGlamor.select("&.s-error", /* :: */[
                                    TypedGlamor.borderLeft3(TypedGlamor.px(2), TypedGlamor.solid, Colors.red),
                                    /* [] */0
                                  ]),
                              /* :: */[
                                TypedGlamor.select("& .textHeader", /* :: */[
                                      TypedGlamor.padding2(TypedGlamor.em(0.75), TypedGlamor.em(1.25)),
                                      /* :: */[
                                        TypedGlamor.fontSize(TypedGlamor.em(0.85)),
                                        /* :: */[
                                          TypedGlamor.color(Colors.text),
                                          /* :: */[
                                            TypedGlamor.textTransform(TypedGlamor.lowercase),
                                            /* :: */[
                                              TypedGlamor.fontVariant(TypedGlamor.smallCaps),
                                              /* :: */[
                                                TypedGlamor.textAlign(TypedGlamor.center),
                                                /* [] */0
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]),
                                /* :: */[
                                  TypedGlamor.select("& footer", /* :: */[
                                        TypedGlamor.display(TypedGlamor.flex),
                                        /* :: */[
                                          TypedGlamor.background(Colors.panelDark),
                                          /* :: */[
                                            TypedGlamor.color(Colors.text),
                                            /* :: */[
                                              TypedGlamor.select("& button", /* :: */[
                                                    TypedGlamor.padding2(TypedGlamor.em(0.75), TypedGlamor.em(1)),
                                                    /* [] */0
                                                  ]),
                                              /* [] */0
                                            ]
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
                    ]
                  ]
                ]
              ]
            ]);
}

exports.container = container;
/* Colors Not a pure module */
