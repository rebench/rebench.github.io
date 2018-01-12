'use strict';

var Colors      = require("../styles/Colors.js");
var TypedGlamor = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");

var root = TypedGlamor.css(/* :: */[
      TypedGlamor.background(Colors.panel),
      /* :: */[
        TypedGlamor.unsafe("overflow", "auto"),
        /* :: */[
          TypedGlamor.margin2(TypedGlamor.em(1), TypedGlamor.zero),
          /* :: */[
            TypedGlamor.borderLeft3(TypedGlamor.px(2), TypedGlamor.solid, TypedGlamor.transparent),
            /* :: */[
              TypedGlamor.select("&.collapsible > header", /* :: */[
                    TypedGlamor.hover(/* :: */[
                          TypedGlamor.background(Colors.panelDark),
                          /* :: */[
                            TypedGlamor.unsafe("cursor", "pointer"),
                            /* [] */0
                          ]
                        ]),
                    /* [] */0
                  ]),
              /* :: */[
                TypedGlamor.select("& > main", /* :: */[
                      TypedGlamor.marginTop(TypedGlamor.em(0.5)),
                      /* :: */[
                        TypedGlamor.marginBottom(TypedGlamor.em(0.5)),
                        /* [] */0
                      ]
                    ]),
                /* :: */[
                  TypedGlamor.select("&.s-collapsed > main", /* :: */[
                        TypedGlamor.display(TypedGlamor.none),
                        /* [] */0
                      ]),
                  /* :: */[
                    TypedGlamor.select("&.s-error", /* :: */[
                          TypedGlamor.borderLeft3(TypedGlamor.px(2), TypedGlamor.solid, Colors.red),
                          /* [] */0
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

var textHeader = TypedGlamor.css(/* :: */[
      TypedGlamor.padding2(TypedGlamor.em(0.75), TypedGlamor.em(1.25)),
      /* :: */[
        TypedGlamor.unsafe("fontSize", ".85em"),
        /* :: */[
          TypedGlamor.color(Colors.text),
          /* :: */[
            TypedGlamor.unsafe("textTransform", "lowercase"),
            /* :: */[
              TypedGlamor.unsafe("fontVariant", "small-caps"),
              /* :: */[
                TypedGlamor.unsafe("textAlign", "center"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var footer = TypedGlamor.css(/* :: */[
      TypedGlamor.unsafe("display", "flex"),
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
    ]);

exports.root       = root;
exports.textHeader = textHeader;
exports.footer     = footer;
/* root Not a pure module */
