'use strict';

var Curry  = require("bs-platform/lib/js/curry.js");
var Rebase = require("reason-rebase/lib/js/src/rebase.js");

function make(onMessage, onError) {
  var timeoutId = [/* None */0];
  var worker = new Worker("../build/worker.js");
  worker.onmessage = (function (message) {
      if (message.type === "end") {
        return Rebase.Option[/* forEach */8]((function (prim) {
                      clearTimeout(prim);
                      return /* () */0;
                    }), timeoutId[/* contents */0]);
      } else {
        return Curry._1(onMessage, message);
      }
    });
  worker.onerror = onError;
  return /* record */[/* postMessage */(function (message) {
              worker.postMessage(message);
              return /* () */0;
            })];
}

exports.make = make;
/* No side effect */
