'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var container = TypedGlamor.css(/* :: */[
      TypedGlamor.background(Colors.background),
      /* :: */[
        TypedGlamor.minHeight(TypedGlamor.vh(100)),
        /* :: */[
          TypedGlamor.display(TypedGlamor.flex),
          /* :: */[
            TypedGlamor.flexDirection(TypedGlamor.column),
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
    ]);

exports.container = container;
/* container Not a pure module */
