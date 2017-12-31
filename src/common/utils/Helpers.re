open Rebase;

let text = ReasonReact.stringToElement;

let classNames = items =>
  items |> List.map(((name, flag)) => flag ? name : "")
        |> List.filter(s => s !== "")
        |> String.joinWith(" ");

let log = value => {
  Js.log(value);
  value
};