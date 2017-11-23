[@bs.val] external origin : string = "window.location.origin";
[@bs.val] external pathname : string = "window.location.pathname";
[@bs.val] external search : string = "window.location.search";

[@bs.val] external replaceState : ([@bs.as {json|null|json}] _) => ([@bs.as ""] _) => string => unit = "window.history.replaceState";
