'use strict';

var React           = require("react");
var Button          = require("../common/components/Button.js");
var Vrroom          = require("vrroom/lib/js/src/Vrroom.bs.js");
var ReasonReact     = require("reason-react/lib/js/src/ReasonReact.js");
var TypedGlamor     = require("typed-glamor/lib/js/src/TypedGlamor.bs.js");
var WidthContainer  = require("./WidthContainer.js");
var HelpModalStyles = require("./HelpModalStyles.js");

var content = "\n<p>\n  <span class=\"brand\">re:bench</span> is a benchmark playground primarily targeting Reason, but also supporting OCaml and JavaScript and comparison\n  between test cases written in different languages.\n\n<p>\n  A <em>test</em> is a unit of code that will be measured while executed repeatedly. Anything you do not want to measure should be\n  put in the <em>setup</em> block. Furthermore, setup code is toplevel, can include type and module defintions, and anything defined\n  there will be available in every test. The tests on the other hand are isolated by being wrapped in a function.\n\n<p>\n  Change the <em>language</em> of a test by clicking on the langauge button in the top left of the test block, then select the desired\n  language in the dropdown.\n\n<p>\n  Click the <em>output</em> button in the top right of the test block to see the generated javascript. Looking at this might make\n  it easier to understand the perfomance characteristics of the code, as well as the test itself. The <code>__test__</code> function\n  is the function that will be measured. Anything outside it will not be taken into account, unless it's used inside the\n  <code>__test__</code> function.\n\n<p>\n  Click the <em>Add</em> button on the top toolbar to add a new test, and <em>Clear</em> to reset everything to scratch, or\n  click <em>Remove</em> on an individual test to remove only that.\n\n<p>\n  <em>Run All</em> will run all the tests in sequence. Click the <em>Run</em> button on an individual test to run only that.\n  By running tests individually you can run them in parallell, but make sure you have enough idle cores or the tests results\n  will be negatively affected.\n\n<p>\n  Clicke the <em>Share</em> button to copy a shareable URL to the clipboard.\n\n<p>\n  That's about it. If you come across a bug, or something you don't understand, please let me know by\n  <a href=\"https://github.com/rebench/rebench.github.io/issues/new\">creating an issue</a>. Happy benchmarking! :)\n\n";

var component = ReasonReact.statelessComponent("HelpPopup");

function make(onClose, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return ReasonReact.element(/* None */0, /* None */0, WidthContainer.make(/* array */[React.createElement("div", {
                            className: TypedGlamor.toString(HelpModalStyles.container)
                          }, React.createElement("header", undefined, React.createElement("h1", undefined, Vrroom.Helpers[/* text */0]("Help")), ReasonReact.element(/* None */0, /* None */0, Button.make("", /* Some */["close"], /* None */0, /* None */0, /* None */0, onClose, /* array */[]))), React.createElement("main", {
                                dangerouslySetInnerHTML: {
                                  __html: content
                                }
                              }))]));
    });
  return newrecord;
}

var Styles = 0;

exports.Styles    = Styles;
exports.content   = content;
exports.component = component;
exports.make      = make;
/* component Not a pure module */
