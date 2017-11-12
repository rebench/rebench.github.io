'use strict';

var $$Array    = require("bs-platform/lib/js/array.js");
var Block      = require("bs-platform/lib/js/block.js");
var Curry      = require("bs-platform/lib/js/curry.js");
var Rebase     = require("reason-rebase/lib/js/src/rebase.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function _decodeReceived(message) {
  var match = message.data.type;
  switch (match) {
    case "caseCycle" : 
        var data = message.data.contents;
        return /* CaseCycle */Block.__(0, [
                  data.id,
                  /* record */[
                    /* hz */data.hz,
                    /* rme */data.rme,
                    /* sampleCount */data.sampleCount
                  ]
                ]);
    case "complete" : 
        return /* SuiteComplete */0;
    case "suiteCycle" : 
        var data$1 = message.data.contents;
        return /* SuiteCycle */Block.__(1, [
                  data$1.id,
                  /* record */[
                    /* hz */data$1.hz,
                    /* rme */data$1.rme,
                    /* sampleCount */data$1.sampleCount
                  ]
                ]);
    default:
      return Pervasives.failwith("unknown worker message");
  }
}

function _encodeToSend(param) {
  return {
          code: param[0],
          testCases: $$Array.of_list(param[1])
        };
}

var Message = /* module */[
  /* _decodeReceived */_decodeReceived,
  /* _encodeToSend */_encodeToSend
];

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
        return Curry._1(onMessage, _decodeReceived(message));
      }
    });
  worker.onerror = onError;
  return /* record */[/* postMessage */(function (message) {
              worker.postMessage(_encodeToSend(message));
              return /* () */0;
            })];
}

var _toArray = $$Array.of_list;

exports._toArray = _toArray;
exports.Message  = Message;
exports.make     = make;
/* No side effect */
