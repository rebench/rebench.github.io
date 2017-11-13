'use strict';

var Colors       = require("./styles/Colors.js");
var Glamor       = require("bs-glamor/lib/js/src/glamor.js");
var ButtonStyles = require("./styles/ButtonStyles.js");

var root = Glamor.css(/* :: */[
      Glamor.background(Colors.panel),
      /* [] */0
    ]);

var button = ButtonStyles.button;

exports.root   = root;
exports.button = button;
/* root Not a pure module */
