[%bs.raw {|require('codemirror/lib/codemirror.css')|}];
[%bs.raw {|require('codemirror/theme/material.css')|}];
[%bs.raw {|require('codemirror/mode/javascript/javascript')|}];
[%bs.raw {|require('codemirror/mode/rust/rust')|}];
[%bs.raw {|require('codemirror/mode/mllike/mllike')|}];

let _langToMode =
  fun | `ML => "mllike"
      | `RE => "rust" 
      | _   => "javascript";

let component = ReasonReact.statelessComponent("Editor");
let make = (~value, ~lang, ~defaultValue=?, ~readOnly=false, ~inputRef=?, ~onChange=?, _) => {
  ...component,
  render: (_) =>
    <CodeMirror
      value
      ref=?inputRef
      ?defaultValue
      ?onChange
      options={
        "mode":         _langToMode(lang),
        "theme":        "material",
        "lineNumbers":  true,
        "readOnly":     Js.Boolean.to_js_boolean(readOnly)
      }
    />
};
