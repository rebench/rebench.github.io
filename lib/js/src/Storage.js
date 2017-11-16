'use strict';

var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var LzString     = require("lz-string");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function _generateShareableUrl(data) {
  return window.location.origin + window.location.pathname + "?state=" + LzString.compressToEncodedURIComponent(data);
}

function _setQueryParam(data) {
  window.history.replaceState((null), "", _generateShareableUrl(data));
  return /* () */0;
}

function retrieve() {
  var fromQueryParam = function () {
    var prefix = "?state=";
    var queryParam = window.location.search;
    if (queryParam.startsWith(prefix)) {
      return Js_primitive.null_undefined_to_opt(LzString.decompressFromEncodedURIComponent(queryParam.slice(Rebase.$$String[/* length */0](prefix))));
    } else {
      return /* None */0;
    }
  };
  return Rebase.Option[/* map */2]((function (prim) {
                return prim;
              }), Rebase.Option[/* map */2]((function (prim) {
                    return JSON.parse(prim);
                  }), Rebase.Option[/* or_ */13](Js_primitive.null_to_opt(localStorage.getItem("rebench-data")), fromQueryParam(/* () */0))));
}

function persist(setupCode, testCases) {
  var data = Rebase.Option[/* getOrRaise */15](Js_primitive.undefined_to_opt(JSON.stringify(/* tuple */[
                setupCode,
                testCases
              ])));
  window.history.replaceState((null), "", _generateShareableUrl(data));
  try {
    localStorage.setItem("rebench-data", data);
    return /* () */0;
  }
  catch (raw_e){
    var e = Js_exn.internalToOCamlException(raw_e);
    console.log(e);
    return /* () */0;
  }
}

exports._generateShareableUrl = _generateShareableUrl;
exports._setQueryParam        = _setQueryParam;
exports.retrieve              = retrieve;
exports.persist               = persist;
/* lz-string Not a pure module */
