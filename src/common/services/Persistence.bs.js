'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var LzString = require("lz-string");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function Make(Config) {
  var _prefix = "?" + (Config[/* id */0] + "=");
  var _generateUrl = function (data) {
    return window.location.origin + (window.location.pathname + (_prefix + LzString.compressToEncodedURIComponent(Curry._1(Config[/* serialize */3], data))));
  };
  var _retrieve = function () {
    var fromUrl = function () {
      if (window.location.search.startsWith(_prefix)) {
        return Js_primitive.null_undefined_to_opt(LzString.decompressFromEncodedURIComponent(window.location.search.slice(Rebase.$$String[/* length */1](_prefix))));
      } else {
        return /* None */0;
      }
    };
    var fromLocalStorage = function () {
      return Js_primitive.null_to_opt(localStorage.getItem(Config[/* id */0]));
    };
    return Rebase.Option[/* map */0](Config[/* deserialize */4], Rebase.Option[/* or_ */15](fromLocalStorage(/* () */0), fromUrl(/* () */0)));
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
    return /* record */[
            /* debugName */component[/* debugName */0],
            /* reactClassInternal */component[/* reactClassInternal */1],
            /* handedOffState */component[/* handedOffState */2],
            /* willReceiveProps */component[/* willReceiveProps */3],
            /* didMount */component[/* didMount */4],
            /* didUpdate */component[/* didUpdate */5],
            /* willUnmount */component[/* willUnmount */6],
            /* willUpdate */component[/* willUpdate */7],
            /* shouldUpdate */component[/* shouldUpdate */8],
            /* render */(function (param) {
                var state = param[/* state */1];
                var url = _generateUrl(state[/* current */0]);
                if (url !== window.location.href) {
                  window.history.replaceState(null, "", url);
                }
                return Curry._3(renderChildren, state, url, param[/* send */3]);
              }),
            /* initialState */(function () {
                return /* record */[
                        /* current */Rebase.Option[/* getOr */16](Curry._1(Config[/* default */1], /* () */0), _retrieve(/* () */0)),
                        /* undo : None */0
                      ];
              }),
            /* retainedProps */component[/* retainedProps */11],
            /* reducer */(function (action, state) {
                var match = Curry._2(Config[/* reducer */2], state[/* current */0], action);
                var variant = match[0];
                if (variant !== 737434270) {
                  if (variant >= 999946793) {
                    return /* UpdateWithSideEffects */Block.__(2, [
                              /* record */[
                                /* current */match[1],
                                /* undo : None */0
                              ],
                              (function (param) {
                                  return _persist(param[/* state */1][/* current */0]);
                                })
                            ]);
                  } else {
                    var match$1 = match[1];
                    return /* UpdateWithSideEffects */Block.__(2, [
                              /* record */[
                                /* current */match$1[1],
                                /* undo : Some */[/* tuple */[
                                    match$1[0],
                                    state[/* current */0]
                                  ]]
                              ],
                              (function (param) {
                                  return _persist(param[/* state */1][/* current */0]);
                                })
                            ]);
                  }
                } else {
                  return /* Update */Block.__(0, [/* record */[
                              /* current */match[1],
                              /* undo */state[/* undo */1]
                            ]]);
                }
              }),
            /* subscriptions */component[/* subscriptions */13],
            /* jsElementWrapped */component[/* jsElementWrapped */14]
          ];
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
