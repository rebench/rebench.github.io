'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var CodeMirror = require("../ffi/components/CodeMirror.bs.js");
var Js_boolean = require("bs-platform/lib/js/js_boolean.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var TypedGlamor = require("typed-glamor/src/TypedGlamor.bs.js");
var EditorStyles = require("./EditorStyles.bs.js");

((require('codemirror/lib/codemirror.css')));

((require('codemirror/theme/material.css')));

((require('codemirror/mode/javascript/javascript')));

((require('codemirror/mode/rust/rust')));

((require('codemirror/mode/mllike/mllike')));

((require('codemirror/addon/scroll/simplescrollbars.js')));

((require('codemirror/addon/scroll/simplescrollbars.css')));

function _langToMode(param) {
  if (param !== 17247) {
    if (param >= 18355) {
      return "rust";
    } else {
      return "javascript";
    }
  } else {
    return "mllike";
  }
}

function setMarks(editor, marks) {
  return Rebase.Option[/* forEach */8]((function (editor) {
                return CodeMirror.setMarks(editor, Rebase.$$Array[/* fromList */13](marks));
              }), editor[0]);
}

var component = ReasonReact.reducerComponent("Editor");

function make(value, lang, defaultValue, $staropt$star, $staropt$star$1, inputRef, onChange, _) {
  var marks = $staropt$star ? $staropt$star[0] : /* [] */0;
  var readOnly = $staropt$star$1 ? $staropt$star$1[0] : /* false */0;
  var newrecord = component.slice();
  newrecord[/* didUpdate */5] = (function (param) {
      return setMarks(param[/* newSelf */1][/* state */2][/* editor */0], marks);
    });
  newrecord[/* render */9] = (function (param) {
      return React.createElement("div", {
                  className: TypedGlamor.toString(EditorStyles.container)
                }, ReasonReact.element(/* None */0, inputRef, CodeMirror.make(/* None */0, /* Some */[value], defaultValue, /* Some */[Curry._1(param[/* handle */0], (function (editor, param) {
                                  param[/* state */2][/* editor */0][0] = /* Some */[editor];
                                  return /* () */0;
                                }))], onChange, /* Some */[{
                            mode: _langToMode(lang),
                            theme: "material",
                            lineNumbers: /* true */1,
                            readOnly: Js_boolean.to_js_boolean(readOnly),
                            scrollbarStyle: "simple"
                          }], /* array */[])));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* editor */[/* None */0]];
    });
  newrecord[/* reducer */12] = (function (_, _$1) {
      return /* NoUpdate */0;
    });
  return newrecord;
}

exports._langToMode = _langToMode;
exports.setMarks = setMarks;
exports.component = component;
exports.make = make;
/*  Not a pure module */
