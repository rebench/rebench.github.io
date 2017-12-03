'use strict';


function name(param) {
  if (param !== 17247) {
    if (param >= 18355) {
      return "Reason";
    } else {
      return "JavaScript";
    }
  } else {
    return "OCaml";
  }
}

function abbreviation(param) {
  if (param !== 17247) {
    if (param >= 18355) {
      return "RE";
    } else {
      return "JS";
    }
  } else {
    return "ML";
  }
}

exports.name         = name;
exports.abbreviation = abbreviation;
/* No side effect */
