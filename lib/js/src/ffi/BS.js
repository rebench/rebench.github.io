'use strict';


function compile(code) {
  return JSON.parse(window.ocaml.compile(code));
}

exports.compile = compile;
/* No side effect */
