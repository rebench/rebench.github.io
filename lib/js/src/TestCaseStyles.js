'use strict';

var Block  = require("bs-platform/lib/js/block.js");
var Glamor = require("bs-glamor/lib/js/src/glamor.js");

var root = Glamor.css(/* :: */[
      Glamor.background("#263238"),
      /* :: */[
        Glamor.margin("1em"),
        /* :: */[
          Glamor.paddingTop("1em"),
          /* [] */0
        ]
      ]
    ]);

var footer = Glamor.css(/* :: */[
      Glamor.display("flex"),
      /* :: */[
        Glamor.background("#263238"),
        /* :: */[
          Glamor.color("#aaa"),
          /* :: */[
            /* Selector */Block.__(1, [
                "& button",
                /* :: */[
                  Glamor.background("#263238"),
                  /* :: */[
                    Glamor.padding(".5em 1em"),
                    /* :: */[
                      Glamor.color("#aaa"),
                      /* :: */[
                        /* Selector */Block.__(1, [
                            "& .mdi",
                            /* :: */[
                              Glamor.marginRight(".25em"),
                              /* [] */0
                            ]
                          ]),
                        /* :: */[
                          /* Selector */Block.__(1, [
                              "&:hover",
                              /* :: */[
                                Glamor.background("#364248"),
                                /* [] */0
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
        ]
      ]
    ]);

var state = Glamor.css(/* :: */[
      Glamor.padding(".5em 1em"),
      /* :: */[
        /* Selector */Block.__(1, [
            "& .mdi",
            /* :: */[
              Glamor.marginRight(".25em"),
              /* [] */0
            ]
          ]),
        /* :: */[
          /* Selector */Block.__(1, [
              "&.s-virgin .mdi",
              /* :: */[
                Glamor.color("rgba(255, 255, 255, .5)"),
                /* [] */0
              ]
            ]),
          /* :: */[
            /* Selector */Block.__(1, [
                "&.s-running .mdi",
                /* :: */[
                  Glamor.color("#FFCB6D"),
                  /* [] */0
                ]
              ]),
            /* :: */[
              /* Selector */Block.__(1, [
                  "&.s-complete .mdi",
                  /* :: */[
                    Glamor.color("#C3E88D"),
                    /* [] */0
                  ]
                ]),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

exports.root   = root;
exports.footer = footer;
exports.state  = state;
/* root Not a pure module */
