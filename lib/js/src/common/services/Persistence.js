'use strict';

var Block        = require("bs-platform/lib/js/block.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var Js_exn       = require("bs-platform/lib/js/js_exn.js");
var Rebase       = require("reason-rebase/lib/js/src/rebase.js");
var LzString     = require("lz-string");
var ReasonReact  = require("reason-react/lib/js/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function Make(Config) {
  var _prefix = "?" + (Config[/* id */0] + "=");
  var _generateUrl = function (data) {
    return window.location.origin + (window.location.pathname + (_prefix + LzString.compressToEncodedURIComponent(Curry._1(Config[/* serialize */3], data))));
  };
  var _retrieve = function () {
    var fromUrl = function () {
      if (window.location.search.startsWith(_prefix)) {
        return Js_primitive.null_undefined_to_opt(LzString.decompressFromEncodedURIComponent(window.location.search.slice(Rebase.$$String[/* length */0](_prefix))));
      } else {
        return /* None */0;
      }
    };
    var fromLocalStorage = function () {
      return Js_primitive.null_to_opt(localStorage.getItem(Config[/* id */0]));
    };
    return Rebase.Option[/* map */2](Config[/* deserialize */4], Rebase.Option[/* or_ */13](fromLocalStorage(/* () */0), fromUrl(/* () */0)));
  };
  var _persist = function (data) {
    try {
      localStorage.setItem(Config[/* id */0], Curry._1(Config[/* serialize */3], data));
      return /* () */0;
    }
    catch (raw_e){
      var e = Js_exn.internalToOCamlException(raw_e);
      console.log(e);
      return /* () */0;
    }
  };
  var component = ReasonReact.reducerComponent("Persistence");
  var make = function (renderChildren) {
    var newrecord = component.slice();
    newrecord[/* render */9] = (function (param) {
        var state = param[/* state */2];
        var url = _generateUrl(state);
        window.history.replaceState((null), "", url);
        return Curry._3(renderChildren, state, url, Curry._1(param[/* reduce */1], (function (action) {
                          return Curry._2(Config[/* reducer */2], state, action);
                        })));
      });
    newrecord[/* initialState */10] = (function () {
        return Rebase.Option[/* getOr */14](Curry._1(Config[/* default */1], /* () */0), _retrieve(/* () */0));
      });
    newrecord[/* reducer */12] = (function (data, _) {
        return /* UpdateWithSideEffects */Block.__(3, [
                  data,
                  (function () {
                      return _persist(data);
                    })
                ]);
      });
    return newrecord;
  };
  return /* module */[
          /* _prefix */_prefix,
          /* _generateUrl */_generateUrl,
          /* _retrieve */_retrieve,
          /* _persist */_persist,
          /* component */component,
          /* make */make
        ];
}

exports.Make = Make;
/* lz-string Not a pure module */
