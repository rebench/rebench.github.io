'use strict';

var Colors      = require("../common/styles/Colors.bs.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");

var container = TypedGlamor.css(/* :: */[
      TypedGlamor.display(TypedGlamor.flex),
      /* :: */[
        TypedGlamor.flexDirection(TypedGlamor.column),
        /* :: */[
          TypedGlamor.maxHeight(TypedGlamor.vh(85)),
          /* :: */[
            TypedGlamor.margin(TypedGlamor.em(2)),
            /* :: */[
              TypedGlamor.background(Colors.panel),
              /* :: */[
                TypedGlamor.color(Colors.text),
                /* :: */[
                  TypedGlamor.boxShadows(/* :: */[
                        TypedGlamor.shadow(TypedGlamor.em(1), TypedGlamor.em(1), /* Some */[TypedGlamor.em(1)], /* None */0, /* None */0, TypedGlamor.rgba(0, 0, 0, 0.1)),
                        /* [] */0
                      ]),
                  /* :: */[
                    TypedGlamor.borderRadius(TypedGlamor.em(0.25)),
                    /* :: */[
                      TypedGlamor.select("> header", /* :: */[
                            TypedGlamor.display(TypedGlamor.flex),
                            /* :: */[
                              TypedGlamor.alignItems(TypedGlamor.baseline),
                              /* :: */[
                                TypedGlamor.paddingLeft(TypedGlamor.em(2)),
                                /* :: */[
                                  TypedGlamor.borderBottom3(TypedGlamor.px(1), TypedGlamor.solid, Colors.panelDark),
                                  /* :: */[
                                    TypedGlamor.textTransform(TypedGlamor.lowercase),
                                    /* :: */[
                                      TypedGlamor.fontVariant(TypedGlamor.smallCaps),
                                      /* :: */[
                                        TypedGlamor.select("> button", /* :: */[
                                              TypedGlamor.marginLeft(TypedGlamor.auto),
                                              /* [] */0
                                            ]),
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]),
                      /* :: */[
                        TypedGlamor.select("> main", /* :: */[
                              TypedGlamor.padding2(TypedGlamor.em(1.5), TypedGlamor.em(2)),
                              /* :: */[
                                TypedGlamor.overflow(TypedGlamor.auto),
                                /* :: */[
                                  TypedGlamor.select("& p", /* :: */[
                                        TypedGlamor.marginTop(TypedGlamor.em(1.45)),
                                        /* :: */[
                                          TypedGlamor.select(":first-child", /* :: */[
                                                TypedGlamor.marginTop(TypedGlamor.zero),
                                                /* [] */0
                                              ]),
                                          /* [] */0
                                        ]
                                      ]),
                                  /* :: */[
                                    TypedGlamor.select("& .brand", /* :: */[
                                          TypedGlamor.color(Colors.reason),
                                          /* [] */0
                                        ]),
                                    /* :: */[
                                      TypedGlamor.select("& em", /* :: */[
                                            TypedGlamor.color(TypedGlamor.white),
                                            /* [] */0
                                          ]),
                                      /* :: */[
                                        TypedGlamor.select("& code", /* :: */[
                                              TypedGlamor.fontFamilies(/* :: */[
                                                    TypedGlamor.monospace,
                                                    /* [] */0
                                                  ]),
                                              /* [] */0
                                            ]),
                                        /* :: */[
                                          TypedGlamor.select("& a", /* :: */[
                                                TypedGlamor.color(Colors.text),
                                                /* :: */[
                                                  TypedGlamor.textDecoration(TypedGlamor.underline),
                                                  /* :: */[
                                                    TypedGlamor.fontStyle(TypedGlamor.italic),
                                                    /* :: */[
                                                      TypedGlamor.transitions(/* :: */[
                                                            /* tuple */[
                                                              TypedGlamor.AnimatableProperty[/* color */31],
                                                              TypedGlamor.ms(150),
                                                              TypedGlamor.easeInOut,
                                                              TypedGlamor.ms(0)
                                                            ],
                                                            /* [] */0
                                                          ]),
                                                      /* :: */[
                                                        TypedGlamor.hover(/* :: */[
                                                              TypedGlamor.color(TypedGlamor.white),
                                                              /* [] */0
                                                            ]),
                                                        /* [] */0
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
    ]);

exports.container = container;
/* container Not a pure module */
