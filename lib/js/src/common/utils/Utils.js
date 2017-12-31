'use strict';

var Curry  = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/lib/js/src/Rebase.bs.js");

function makeCounter(init) {
  var i = [init - 1 | 0];
  return (function () {
      i[0] = i[0] + 1 | 0;
      return i[0];
    });
}

var formatNumber = (
function (number) {
  number = String(number).split('.');

  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
}
);

function debounce(f, wait) {
  var timeout = [/* None */0];
  return (function (data) {
      Rebase.Option[/* forEach */8]((function (id) {
              clearTimeout(id);
              timeout[0] = /* None */0;
              return /* () */0;
            }), timeout[0]);
      timeout[0] = /* Some */[setTimeout((function () {
                timeout[0] = /* None */0;
                return Curry._1(f, data);
              }), wait)];
      return /* () */0;
    });
}

exports.makeCounter  = makeCounter;
exports.formatNumber = formatNumber;
exports.debounce     = debounce;
/* formatNumber Not a pure module */
