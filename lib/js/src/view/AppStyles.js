'use strict';

var Colors      = require("../common/styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
      TypedGlamor.background(Colors.background),
      /* :: */[
        TypedGlamor.minHeight(TypedGlamor.vh(100)),
        /* :: */[
          TypedGlamor.unsafe("display", "flex"),
          /* :: */[
            TypedGlamor.unsafe("flexDirection", "column"),
            /* [] */0
          ]
        ]
      ]
    ]);

var footer = TypedGlamor.css(/* :: */[
      TypedGlamor.background(Colors.darkBackground),
      /* :: */[
        TypedGlamor.padding3(TypedGlamor.em(1), TypedGlamor.zero, TypedGlamor.em(2)),
        /* :: */[
          TypedGlamor.marginTop(TypedGlamor.auto),
          /* :: */[
            TypedGlamor.select("& > div", /* :: */[
                  TypedGlamor.unsafe("display", "flex"),
                  /* :: */[
                    TypedGlamor.select("& > section", /* :: */[
                          TypedGlamor.margin2(TypedGlamor.zero, TypedGlamor.em(2)),
                          /* :: */[
                            TypedGlamor.unsafe("opacity", ".5"),
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
                                      TypedGlamor.unsafe("opacity", "1"),
                                      /* [] */0
                                    ]),
                                /* :: */[
                                  TypedGlamor.select("& h1", /* :: */[
                                        TypedGlamor.unsafe("fontSize", ".85em"),
                                        /* :: */[
                                          TypedGlamor.color(TypedGlamor.rgba(255, 255, 255, 0.5)),
                                          /* :: */[
                                            TypedGlamor.unsafe("textTransform", "lowercase"),
                                            /* :: */[
                                              TypedGlamor.unsafe("fontVariant", "small-caps"),
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
                                            TypedGlamor.unsafe("textDecoration", "none"),
                                            /* :: */[
                                              TypedGlamor.unsafe("fontSize", ".85rem"),
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
    ]);

exports.root   = root;
exports.footer = footer;
/* root Not a pure module */
