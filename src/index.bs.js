'use strict';

var App         = require("./view/App.bs.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Store       = require("./services/Store.bs.js");
var ReactDOMRe  = require("reason-react/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, Curry._1(Store.make, (function (data, url, updateStore) {
                return ReasonReact.element(/* None */0, /* None */0, App.make(data, url, updateStore, /* array */[]));
              }))), "index");

/*  Not a pure module */
