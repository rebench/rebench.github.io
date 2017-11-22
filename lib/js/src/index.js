'use strict';

var App         = require("./App.js");
var ReactDOMRe  = require("reason-react/lib/js/src/ReactDOMRe.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, App.make(/* array */[])), "index");

/*  Not a pure module */
