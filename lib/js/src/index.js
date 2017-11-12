'use strict';

var App         = require("./App.js");
var ReactDOMRe  = require("reason-react/lib/js/src/reactDOMRe.js");
var ReasonReact = require("reason-react/lib/js/src/reasonReact.js");

ReactDOMRe.renderToElementWithId(ReasonReact.element(/* None */0, /* None */0, App.make(/* array */[])), "index");

/*  Not a pure module */
