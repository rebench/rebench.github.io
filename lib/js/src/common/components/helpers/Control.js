'use strict';

var $$Array     = require("bs-platform/lib/js/array.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function make(children) {
  return ReasonReact.wrapJsForReason(React.Fragment, { }, children);
}

var Fragment = /* module */[/* make */make];

var component = ReasonReact.statelessComponent("Control.Map");

function make$1(items, $staropt$star, render) {
  var empty = $staropt$star ? $staropt$star[0] : null;
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, make(/* array */[items.length !== 0 ? $$Array.map(render, items) : empty]));
    });
  return newrecord;
}

var $$Map = /* module */[
  /* component */component,
  /* make */make$1
];

var component$1 = ReasonReact.statelessComponent("Control.Map");

function make$2(items, $staropt$star, render) {
  var empty = $staropt$star ? $staropt$star[0] : null;
  var newrecord = component$1.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, make$1($$Array.of_list(items), /* Some */[empty], render));
    });
  return newrecord;
}

var MapList = /* module */[
  /* component */component$1,
  /* make */make$2
];

var component$2 = ReasonReact.statelessComponent("Control.If");

function make$3(cond, render) {
  var newrecord = component$2.slice();
  newrecord[/* render */9] = (function () {
      if (cond !== 0) {
        return Curry._1(render, /* () */0);
      } else {
        return null;
      }
    });
  return newrecord;
}

var If = /* module */[
  /* component */component$2,
  /* make */make$3
];

var component$3 = ReasonReact.statelessComponent("Control.IFSome");

function make$4(option, render) {
  var newrecord = component$3.slice();
  newrecord[/* render */9] = (function () {
      if (option) {
        return Curry._1(render, option[0]);
      } else {
        return null;
      }
    });
  return newrecord;
}

var IfSome = /* module */[
  /* component */component$3,
  /* make */make$4
];

exports.Fragment = Fragment;
exports.$$Map    = $$Map;
exports.MapList  = MapList;
exports.If       = If;
exports.IfSome   = IfSome;
/* component Not a pure module */
