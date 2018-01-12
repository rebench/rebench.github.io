'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
      TypedGlamor.display(TypedGlamor.inlineBlock),
      /* [] */0
    ]);

var menu = TypedGlamor.css(/* :: */[
      TypedGlamor.position(TypedGlamor.absolute),
      /* :: */[
        TypedGlamor.zIndex(TypedGlamor.$$int(100)),
        /* :: */[
          TypedGlamor.display(TypedGlamor.none),
          /* :: */[
            TypedGlamor.unsafe("transform", "translateX(-2px)"),
            /* :: */[
              TypedGlamor.background(Colors.panelDark),
              /* :: */[
                TypedGlamor.unsafe("boxShadow", "2px 2px 1px 0 rgba(0, 0, 0, .25)"),
                /* :: */[
                  TypedGlamor.select("&.s-open", /* :: */[
                        TypedGlamor.display(TypedGlamor.block),
                        /* [] */0
                      ]),
                  /* :: */[
                    TypedGlamor.select("& > ul > li", /* :: */[
                          TypedGlamor.padding(TypedGlamor.em(1)),
                          /* :: */[
                            TypedGlamor.unsafe("cursor", "pointer"),
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
      ]
    ]);

exports.root = root;
exports.menu = menu;
/* root Not a pure module */
