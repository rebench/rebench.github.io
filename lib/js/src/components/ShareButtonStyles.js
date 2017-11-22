'use strict';

var Block        = require("bs-platform/lib/js/block.js");
var Colors       = require("../styles/Colors.js");
var Glamor       = require("bs-glamor/lib/js/src/glamor.js");
var ButtonStyles = require("../styles/ButtonStyles.js");

var root = Glamor.css(/* :: */[
      Glamor.position("relative"),
      /* :: */[
        /* Selector */Block.__(1, [
            "& input",
            /* :: */[
              Glamor.background(Colors.panelDark),
              /* :: */[
                Glamor.transition("all 250ms"),
                /* :: */[
                  Glamor.width("0"),
                  /* :: */[
                    Glamor.padding("0"),
                    /* :: */[
                      Glamor.color("#888"),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]),
        /* :: */[
          /* Selector */Block.__(1, [
              "& .tooltip",
              /* :: */[
                Glamor.display("none"),
                /* :: */[
                  Glamor.position("absolute"),
                  /* :: */[
                    Glamor.zIndex("100"),
                    /* :: */[
                      Glamor.top("100%"),
                      /* :: */[
                        Glamor.right("1em"),
                        /* :: */[
                          Glamor.background("rgba(0, 0, 0, .6)"),
                          /* :: */[
                            Glamor.color("#aaa"),
                            /* :: */[
                              Glamor.whiteSpace("nowrap"),
                              /* :: */[
                                Glamor.padding(".4em .8em"),
                                /* :: */[
                                  Glamor.borderRadius(".25em"),
                                  /* :: */[
                                    Glamor.fontSize(".8rem"),
                                    /* :: */[
                                      /* Selector */Block.__(1, [
                                          "& .arrow",
                                          /* :: */[
                                            Glamor.position("absolute"),
                                            /* :: */[
                                              Glamor.content(" "),
                                              /* :: */[
                                                Glamor.bottom("100%"),
                                                /* :: */[
                                                  Glamor.right("2em"),
                                                  /* :: */[
                                                    Glamor.height("0"),
                                                    /* :: */[
                                                      Glamor.width("0"),
                                                      /* :: */[
                                                        Glamor.border(".5em solid transparent"),
                                                        /* :: */[
                                                          Glamor.borderBottomColor("rgba(0, 0, 0, .6)"),
                                                          /* :: */[
                                                            Glamor.marginLeft(".5em"),
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
                                        ]),
                                      /* :: */[
                                        /* Selector */Block.__(1, [
                                            "& .confirmation-message",
                                            /* :: */[
                                              Glamor.display("none"),
                                              /* :: */[
                                                Glamor.padding("0 .75em"),
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
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]),
          /* :: */[
            /* Selector */Block.__(1, [
                "&:hover input",
                /* :: */[
                  Glamor.width("25vw"),
                  /* :: */[
                    Glamor.marginRight("1em"),
                    /* :: */[
                      Glamor.padding(".3em"),
                      /* [] */0
                    ]
                  ]
                ]
              ]),
            /* :: */[
              /* Selector */Block.__(1, [
                  "&:hover .tooltip, &.s-show-confirmation .tooltip",
                  /* :: */[
                    Glamor.display("block"),
                    /* [] */0
                  ]
                ]),
              /* :: */[
                /* Selector */Block.__(1, [
                    "&.s-show-confirmation",
                    /* :: */[
                      /* Selector */Block.__(1, [
                          "& .tooltip .message",
                          /* :: */[
                            Glamor.display("none"),
                            /* [] */0
                          ]
                        ]),
                      /* :: */[
                        /* Selector */Block.__(1, [
                            "& .tooltip .confirmation-message",
                            /* :: */[
                              Glamor.display("block"),
                              /* [] */0
                            ]
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
    ]);

var button = ButtonStyles.button;

exports.root   = root;
exports.button = button;
/* root Not a pure module */
