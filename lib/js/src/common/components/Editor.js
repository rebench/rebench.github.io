'use strict';

var CodeMirror  = require("../ffi/components/CodeMirror.js");
var Js_boolean  = require("bs-platform/lib/js/js_boolean.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

((require('codemirror/lib/codemirror.css')));

((require('codemirror/theme/material.css')));

((require('codemirror/mode/javascript/javascript')));

((require('codemirror/mode/rust/rust')));

((require('codemirror/mode/mllike/mllike')));

function _langToMode(param) {
  if (param !== 17247) {
    if (param !== 18355) {
      return "javascript";
    } else {
      return "rust";
    }
  } else {
    return "mllike";
  }
}

var component = ReasonReact.statelessComponent("Editor");

function make(value, lang, defaultValue, $staropt$star, inputRef, onChange, _) {
  var readOnly = $staropt$star ? $staropt$star[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, inputRef, CodeMirror.make(/* None */0, /* Some */[value], defaultValue, onChange, /* Some */[{
                        mode: _langToMode(lang),
                        theme: "material",
                        lineNumbers: /* true */1,
                        readOnly: Js_boolean.to_js_boolean(readOnly)
                      }], /* array */[]));
    });
  return newrecord;
}

exports._langToMode = _langToMode;
exports.component   = component;
exports.make        = make;
/*  Not a pure module */
