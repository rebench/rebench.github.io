'use strict';

var Colors = require("../common/styles/Colors.bs.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");

function container(preventScroll) {
  return TypedGlamor.css(/* :: */[
              TypedGlamor.background(Colors.background),
              /* :: */[
                TypedGlamor.height(TypedGlamor.vh(100)),
                /* :: */[
                  TypedGlamor.display(TypedGlamor.flex),
                  /* :: */[
                    TypedGlamor.flexDirection(TypedGlamor.column),
                    /* :: */[
                      TypedGlamor.select("& > .scroll-container", /* :: */[
                            TypedGlamor.height(TypedGlamor.pct(100)),
                            /* :: */[
                              TypedGlamor.display(TypedGlamor.flex),
                              /* :: */[
                                TypedGlamor.flexDirection(TypedGlamor.column),
                                /* :: */[
                                  preventScroll ? TypedGlamor.overflow(TypedGlamor.hidden) : TypedGlamor.overflow(TypedGlamor.auto),
                                  /* :: */[
                                    TypedGlamor.select("& .undo-button", /* :: */[
                                          TypedGlamor.display(TypedGlamor.block),
                                          /* :: */[
                                            TypedGlamor.margin2(TypedGlamor.em(1), TypedGlamor.auto),
                                            /* [] */0
                                          ]
                                        ]),
                                    /* :: */[
                                      TypedGlamor.select("& > footer", /* :: */[
                                            TypedGlamor.background(Colors.darkBackground),
                                            /* :: */[
                                              TypedGlamor.padding3(TypedGlamor.em(1), TypedGlamor.zero, TypedGlamor.em(2)),
                                              /* :: */[
                                                TypedGlamor.marginTop(TypedGlamor.auto),
                                                /* :: */[
                                                  TypedGlamor.select("& > div", /* :: */[
                                                        TypedGlamor.display(TypedGlamor.flex),
                                                        /* :: */[
                                                          TypedGlamor.select("& > section", /* :: */[
                                                                TypedGlamor.margin2(TypedGlamor.zero, TypedGlamor.em(2)),
                                                                /* :: */[
                                                                  TypedGlamor.opacity(0.5),
                                                                  /* :: */[
                                                                    TypedGlamor.transitions(/* :: */[
                                                                          /* tuple */[
                                                                            TypedGlamor.AnimatableProperty[/* opacity */76],
                                                                            TypedGlamor.ms(500),
                                                                            TypedGlamor.easeInOut,
                                                                            TypedGlamor.ms(0)
                                                                          ],
                                                                          /* [] */0
                                                                        ]),
                                                                    /* :: */[
                                                                      TypedGlamor.hover(/* :: */[
                                                                            TypedGlamor.opacity(1),
                                                                            /* [] */0
                                                                          ]),
                                                                      /* :: */[
                                                                        TypedGlamor.select("& h1", /* :: */[
                                                                              TypedGlamor.fontSize(TypedGlamor.em(0.85)),
                                                                              /* :: */[
                                                                                TypedGlamor.color(TypedGlamor.rgba(255, 255, 255, 0.5)),
                                                                                /* :: */[
                                                                                  TypedGlamor.textTransform(TypedGlamor.lowercase),
                                                                                  /* :: */[
                                                                                    TypedGlamor.fontVariant(TypedGlamor.smallCaps),
                                                                                    /* :: */[
                                                                                      TypedGlamor.marginBottom(TypedGlamor.em(0.35)),
                                                                                      /* [] */0
                                                                                    ]
                                                                                  ]
                                                                                ]
                                                                              ]
                                                                            ]),
                                                                        /* :: */[
                                                                          TypedGlamor.select("& a", /* :: */[
                                                                                TypedGlamor.color(Colors.text),
                                                                                /* :: */[
                                                                                  TypedGlamor.textDecoration(TypedGlamor.none),
                                                                                  /* :: */[
                                                                                    TypedGlamor.fontSize(TypedGlamor.rem(0.85)),
                                                                                    /* :: */[
                                                                                      TypedGlamor.hover(/* :: */[
                                                                                            TypedGlamor.color(TypedGlamor.white),
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
                                                              ]),
                                                          /* [] */0
                                                        ]
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
                          ]),
                      /* :: */[
                        TypedGlamor.select("& > .mask", /* :: */[
                              TypedGlamor.position(TypedGlamor.fixed),
                              /* :: */[
                                TypedGlamor.zIndex(TypedGlamor.$$int(10)),
                                /* :: */[
                                  TypedGlamor.offsetTop(TypedGlamor.zero),
                                  /* :: */[
                                    TypedGlamor.height(TypedGlamor.vh(100)),
                                    /* :: */[
                                      TypedGlamor.width(TypedGlamor.vw(100)),
                                      /* :: */[
                                        TypedGlamor.background(TypedGlamor.rgba(0, 0, 0, 0.5)),
                                        /* [] */0
                                      ]
                                    ]
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
            ]);
}

exports.container = container;
/* Colors Not a pure module */
