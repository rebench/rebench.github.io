'use strict';


function apply(language, code) {
  if (language !== 17247) {
    if (language >= 18355) {
      return "let __test__ = () => {\n  " + (String(code) + "\n};");
    } else {
      return "[%%raw {|function __test__() {\n" + (String(code) + "\n}\n\nexports.__test__ = __test__|}];");
    }
  } else {
    return "let __test__ () = (\n  " + (String(code) + "\n)");
  }
}

exports.apply = apply;
/* No side effect */
