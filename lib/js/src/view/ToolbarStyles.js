'use strict';

var Colors       = require("../common/styles/Colors.js");
var Glamor       = require("bs-glamor/lib/js/src/glamor.js");
var ButtonStyles = require("../common/styles/ButtonStyles.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* :: */[
        Glamor.display("flex"),
        /* [] */0
      ]
    ]);

var separator = Glamor.css(/* :: */[
      Glamor.flexGrow("1"),
      /* [] */0
    ]);

var button = ButtonStyles.button;

exports.root      = root;
exports.button    = button;
exports.separator = separator;
/* root Not a pure module */
