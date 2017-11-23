'use strict';

var App         = require("./App.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Store       = require("./Store.js");
var Compiler    = require("./Compiler.js");
var ReactDOMRe  = require("reason-react/lib/js/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, Curry._1(Store.make, (function (data, url, updateStore) {
                var compilerResult = Compiler.compile(data[/* setup */0], data[/* tests */1]);
                return ReasonReact.element(/* None */0, /* None */0, App.make(data, url, updateStore, compilerResult, /* array */[]));
              }))), "index");

/*  Not a pure module */
