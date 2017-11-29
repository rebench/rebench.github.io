'use strict';

var Curry        = require("bs-platform/lib/js/curry.js");
var React        = require("react");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var CodeMirror   = require("../ffi/components/CodeMirror.js");
var Js_boolean   = require("bs-platform/lib/js/js_boolean.js");
var ReasonReact  = require("reason-react/lib/js/src/ReasonReact.js");
var EditorStyles = require("./EditorStyles.js");

((require('codemirror/lib/codemirror.css')));

((require('codemirror/theme/material.css')));

((require('codemirror/mode/javascript/javascript')));

((require('codemirror/mode/rust/rust')));

((require('codemirror/mode/mllike/mllike')));

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
                return CodeMirror.setMarks(editor, Rebase.List[/* toArray */16](marks));
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
                  className: EditorStyles.root
                }, ReasonReact.element(/* None */0, inputRef, CodeMirror.make(/* None */0, /* Some */[value], defaultValue, /* Some */[Curry._1(param[/* handle */0], (function (editor, param) {
                                  param[/* state */2][/* editor */0][0] = /* Some */[editor];
                                  return /* () */0;
                                }))], onChange, /* Some */[{
                            mode: _langToMode(lang),
                            theme: "material",
                            lineNumbers: /* true */1,
                            readOnly: Js_boolean.to_js_boolean(readOnly)
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

var Styles = 0;

exports.Styles      = Styles;
exports._langToMode = _langToMode;
exports.setMarks    = setMarks;
exports.component   = component;
exports.make        = make;
/*  Not a pure module */
