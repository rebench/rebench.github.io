'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_undefined = require("bs-platform/lib/js/js_undefined.js");
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
              style: Js_undefined.fromOption(style),
              value: Js_undefined.fromOption(value),
              defaultValue: Js_undefined.fromOption(defaultValue),
              editorDidMount: Js_undefined.fromOption(editorDidMount),
              onBeforeChange: Rebase.Option[/* mapOr */18]((function (f, _, _$1, value) {
                      return Curry._1(f, value);
                    }), (function (_, _$1, _$2) {
                      return /* () */0;
                    }), onChange),
              options: Js_undefined.fromOption(options)
            }, children);
}

exports.setMarks = setMarks$1;
exports.make = make;
/*  Not a pure module */
