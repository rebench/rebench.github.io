'use strict';

var Curry            = require("bs-platform/lib/js/curry.js");
var Rebase           = require("reason-rebase/lib/js/src/rebase.js");
var ReasonReact      = require("reason-react/lib/js/src/ReasonReact.js");
var Js_undefined     = require("bs-platform/lib/js/js_undefined.js");
var ReactCodemirror2 = require("react-codemirror2");


  function setMarks(editor, marks) {
    editor.getAllMarks().forEach(function (mark) {
      mark.clear();
    });

    marks.forEach(function (mark) {
      editor.markText(mark.from, mark.to, mark.options);
    });
  }

;

function setMarks$1(prim, prim$1) {
  setMarks(prim, prim$1);
  return /* () */0;
}

function make(style, value, defaultValue, editorDidMount, onChange, options, children) {
  return ReasonReact.wrapJsForReason(ReactCodemirror2.Controlled, {
              style: Js_undefined.from_opt(style),
              value: Js_undefined.from_opt(value),
              defaultValue: Js_undefined.from_opt(defaultValue),
              editorDidMount: Js_undefined.from_opt(editorDidMount),
              onBeforeChange: Rebase.Option[/* mapOr */16]((function (f, _, _$1, value) {
                      return Curry._1(f, value);
                    }), (function (_, _$1, _$2) {
                      return /* () */0;
                    }), onChange),
              options: Js_undefined.from_opt(options)
            }, children);
}

exports.setMarks = setMarks$1;
exports.make     = make;
/*  Not a pure module */
