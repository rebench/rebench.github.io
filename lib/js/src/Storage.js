'use strict';

var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var storageKey = "rebench-data";

function retrieve() {
  return Js_primitive.null_to_opt(localStorage.getItem(storageKey));
}

function persist(json) {
  try {
    var data = JSON.stringify(json);
    localStorage.setItem(storageKey, data);
    return /* () */0;
  }
  catch (raw_e){
    var e = Js_exn.internalToOCamlException(raw_e);
    console.log(e);
    return /* () */0;
  }
}

exports.storageKey = storageKey;
exports.retrieve   = retrieve;
exports.persist    = persist;
/* No side effect */
