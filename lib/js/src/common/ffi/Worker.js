'use strict';

var $$Array    = require("bs-platform/lib/js/array.js");
var Block      = require("bs-platform/lib/js/block.js");
var Curry      = require("bs-platform/lib/js/curry.js");
var Rebase     = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");

function _decodeReceived(message) {
  var data = message.data.contents;
  var makeResult = function () {
    return /* record */[
            /* hz */data.hz,
            /* rme */data.rme,
            /* sampleCount */data.sampleCount
          ];
  };
  var match = message.data.type;
  switch (match) {
    case "complete" : 
        return /* SuiteComplete */0;
    case "suiteCycle" : 
        return /* SuiteCycle */Block.__(2, [
                  data.id,
                  makeResult(/* () */0)
                ]);
    case "testCycle" : 
        return /* TestCycle */Block.__(0, [
                  data.id,
                  makeResult(/* () */0)
                ]);
    case "testError" : 
        return /* TestError */Block.__(1, [
                  data.id,
                  data.error
                ]);
    default:
      return Pervasives.failwith("unknown worker message");
  }
}

function _encodeToSend(param) {
  return Rebase.$$Array[/* map */0]((function (param) {
                return {
                        name: param[0],
                        code: param[1]
                      };
              }), $$Array.of_list(param[0]).reverse());
}

var Message = /* module */[
  /* _decodeReceived */_decodeReceived,
  /* _encodeToSend */_encodeToSend
];

function make(onMessage) {
  var timeoutId = [/* None */0];
  var worker = new Worker("../build/worker.js");
  worker.onmessage = (function (message) {
      var match = message.type;
      if (match === "end") {
        return Rebase.Option[/* forEach */8]((function (prim) {
                      clearTimeout(prim);
                      return /* () */0;
                    }), timeoutId[/* contents */0]);
      } else {
        return Curry._1(onMessage, _decodeReceived(message));
      }
    });
  worker.onerror = (function (e) {
      return Curry._1(onMessage, /* WorkerError */Block.__(3, [e]));
    });
  return /* record */[/* postMessage */Curry._2(Rebase.Fn[/* >> */6], _encodeToSend, (function (param) {
                  worker.postMessage(param);
                  return /* () */0;
                }))];
}

var _toArray = $$Array.of_list;

exports._toArray = _toArray;
exports.Message  = Message;
exports.make     = make;
/* No side effect */
