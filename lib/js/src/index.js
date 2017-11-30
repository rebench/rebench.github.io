'use strict';

var App         = require("./view/App.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Store       = require("./services/Store.js");
var ReactDOMRe  = require("reason-react/lib/js/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, Curry._1(Store.make, (function (data, url, updateStore) {
                return ReasonReact.element(/* None */0, /* None */0, App.make(data, url, updateStore, /* array */[]));
              }))), "index");

/*  Not a pure module */
