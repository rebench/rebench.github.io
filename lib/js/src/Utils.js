'use strict';


function makeCounter(init) {
  var i = [init - 1 | 0];
  return (function () {
      i[0] = i[0] + 1 | 0;
      return i[0];
    });
}

var formatNumber = (
function formatNumber(number) {
  number = String(number).split('.');

  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
}
);

exports.makeCounter  = makeCounter;
exports.formatNumber = formatNumber;
/* formatNumber Not a pure module */
