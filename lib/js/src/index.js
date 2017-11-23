'use strict';

var App         = require("./view/App.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Store       = require("./services/Store.js");
var Compiler    = require("./services/Compiler.js");
var Debounce    = require("./common/services/Debounce.js");
var ReactDOMRe  = require("reason-react/lib/js/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function compute(data) {
  return Compiler.compile(data[/* setup */0], data[/* tests */1]);
}

var DebouncedCompiler = Debounce.Make(/* module */[/* compute */compute]);

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, Curry._1(Store.make, (function (data, url, updateStore) {
                return ReasonReact.element(/* None */0, /* None */0, Curry._3(DebouncedCompiler[/* make */1], data, 300, (function (compilerResult) {
                                  return ReasonReact.element(/* None */0, /* None */0, App.make(data, url, updateStore, compilerResult, /* array */[]));
                                })));
              }))), "index");

exports.DebouncedCompiler = DebouncedCompiler;
/* DebouncedCompiler Not a pure module */
