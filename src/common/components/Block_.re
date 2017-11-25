open Helpers;

module Styles = BlockStyles;

let renderHeader =
  fun | `Text(str)          => (str |> text)
      | `Elements(elements) => elements |> ReasonReact.arrayToElement;

let renderFooter = 
  fun | Some(elements) =>
        <div className=Styles.footer>
          (elements |> ReasonReact.arrayToElement)
        </div>
      | None => ReasonReact.nullElement;

let makeClassName =
  fun | Some(className) => className ++ " " ++ Styles.root
      | None            => Styles.root;

let component = ReasonReact.statelessComponent("Block");
let make = (~header, ~footer=?, ~className=?, children) => {
  ...component,
  render: (_) =>
    <div className=makeClassName(className)>

      <div className=Styles.header>
        (renderHeader(header))
      </div>

      <div className=Styles.content>
        (children |> ReasonReact.arrayToElement)
      </div>

      (renderFooter(footer))

    </div>
};
