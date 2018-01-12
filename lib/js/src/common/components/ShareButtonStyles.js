'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
      TypedGlamor.position(TypedGlamor.relative),
      /* :: */[
        TypedGlamor.select("& input", /* :: */[
              TypedGlamor.background(Colors.panelDark),
              /* :: */[
                TypedGlamor.transitions(/* :: */[
                      /* tuple */[
                        TypedGlamor.AnimatableProperty[/* all */0],
                        TypedGlamor.ms(250),
                        TypedGlamor.easeInOut,
                        TypedGlamor.ms(0)
                      ],
                      /* [] */0
                    ]),
                /* :: */[
                  TypedGlamor.width(TypedGlamor.zero),
                  /* :: */[
                    TypedGlamor.padding(TypedGlamor.zero),
                    /* :: */[
                      TypedGlamor.color(TypedGlamor.rgba(255, 255, 255, 0.75)),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]),
        /* :: */[
          TypedGlamor.select("& .tooltip", /* :: */[
                TypedGlamor.display(TypedGlamor.none),
                /* :: */[
                  TypedGlamor.position(TypedGlamor.absolute),
                  /* :: */[
                    TypedGlamor.zIndex(TypedGlamor.$$int(100)),
                    /* :: */[
                      TypedGlamor.offsetTop(TypedGlamor.pct(100)),
                      /* :: */[
                        TypedGlamor.offsetRight(TypedGlamor.em(1)),
                        /* :: */[
                          TypedGlamor.background(TypedGlamor.rgba(0, 0, 0, 1)),
                          /* :: */[
                            TypedGlamor.color(TypedGlamor.hex(3276)),
                            /* :: */[
                              TypedGlamor.unsafe("whiteSpace", "nowrap"),
                              /* :: */[
                                TypedGlamor.padding2(TypedGlamor.em(0.4), TypedGlamor.em(0.8)),
                                /* :: */[
                                  TypedGlamor.borderRadius(TypedGlamor.em(0.25)),
                                  /* :: */[
                                    TypedGlamor.unsafe("fontSize", ".8rem"),
                                    /* :: */[
                                      TypedGlamor.select("& .arrow", /* :: */[
                                            TypedGlamor.position(TypedGlamor.absolute),
                                            /* :: */[
                                              TypedGlamor.unsafe("content", " "),
                                              /* :: */[
                                                TypedGlamor.offsetBottom(TypedGlamor.pct(100)),
                                                /* :: */[
                                                  TypedGlamor.offsetRight(TypedGlamor.em(2)),
                                                  /* :: */[
                                                    TypedGlamor.height(TypedGlamor.zero),
                                                    /* :: */[
                                                      TypedGlamor.width(TypedGlamor.zero),
                                                      /* :: */[
                                                        TypedGlamor.border3(TypedGlamor.em(0.5), TypedGlamor.solid, TypedGlamor.transparent),
                                                        /* :: */[
                                                          TypedGlamor.borderBottomColor(TypedGlamor.rgba(0, 0, 0, 1)),
                                                          /* :: */[
                                                            TypedGlamor.marginLeft(TypedGlamor.em(0.5)),
                                                            /* [] */0
                                                          ]
                                                        ]
                                                      ]
                                                    ]
                                                  ]
                                                ]
                                              ]
                                            ]
                                          ]),
                                      /* :: */[
                                        TypedGlamor.select("& .confirmation-message", /* :: */[
                                              TypedGlamor.display(TypedGlamor.none),
                                              /* :: */[
                                                TypedGlamor.padding2(TypedGlamor.zero, TypedGlamor.em(0.75)),
                                                /* [] */0
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
                  ]
                ]
              ]),
          /* :: */[
            TypedGlamor.hover(/* :: */[
                  TypedGlamor.select("& input", /* :: */[
                        TypedGlamor.width(TypedGlamor.vw(25)),
                        /* :: */[
                          TypedGlamor.marginRight(TypedGlamor.em(1)),
                          /* :: */[
                            TypedGlamor.padding(TypedGlamor.em(0.3)),
                            /* [] */0
                          ]
                        ]
                      ]),
                  /* :: */[
                    TypedGlamor.select("& .tooltip, &.s-show-confirmation .tooltip", /* :: */[
                          TypedGlamor.display(TypedGlamor.block),
                          /* [] */0
                        ]),
                    /* [] */0
                  ]
                ]),
            /* :: */[
              TypedGlamor.select("&.s-show-confirmation .tooltip", /* :: */[
                    TypedGlamor.display(TypedGlamor.block),
                    /* [] */0
                  ]),
              /* :: */[
                TypedGlamor.select("&.s-show-confirmation", /* :: */[
                      TypedGlamor.select("& .tooltip .message", /* :: */[
                            TypedGlamor.display(TypedGlamor.none),
                            /* [] */0
                          ]),
                      /* :: */[
                        TypedGlamor.select("& .tooltip .confirmation-message", /* :: */[
                              TypedGlamor.display(TypedGlamor.block),
                              /* [] */0
                            ]),
                        /* [] */0
                      ]
                    ]),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

exports.root = root;
/* root Not a pure module */
