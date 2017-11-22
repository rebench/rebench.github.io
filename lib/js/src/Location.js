'use strict';

var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var LzString     = require("lz-string");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function generate(json) {
  var data = LzString.compressToEncodedURIComponent(JSON.stringify(json));
  return window.location.origin + window.location.pathname + "?state=" + data;
}

function retrieve() {
  var prefix = "?state=";
  var queryParam = window.location.search;
  if (queryParam.startsWith(prefix)) {
    return Js_primitive.null_undefined_to_opt(LzString.decompressFromEncodedURIComponent(queryParam.slice(Rebase.$$String[/* length */0](prefix))));
  } else {
    return /* None */0;
  }
}

exports.generate = generate;
exports.retrieve = retrieve;
/* lz-string Not a pure module */
