open Rebase;

let text = ReasonReact.stringToElement;

let classNames =
  Fn.( List.map(((name, flag)) => flag ? name : "")
    >> List.filter(s => s !== "")
    >> String.joinWith(" "));