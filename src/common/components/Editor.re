open Rebase;

[%bs.raw {|require('codemirror/lib/codemirror.css')|}];
[%bs.raw {|require('codemirror/theme/material.css')|}];
[%bs.raw {|require('codemirror/mode/javascript/javascript')|}];
[%bs.raw {|require('codemirror/mode/rust/rust')|}];
[%bs.raw {|require('codemirror/mode/mllike/mllike')|}];
[%bs.raw {|require('codemirror/addon/scroll/simplescrollbars.js')|}];
[%bs.raw {|require('codemirror/addon/scroll/simplescrollbars.css')|}];

let _langToMode =
  fun | `ML => "mllike"
      | `RE => "rust" 
      | `JS => "javascript";

type mark = {.
  "from":     {. "line": int, "ch": int },
  "to":       {. "line": int, "ch": int },
  "options":  {. "className": string, "title": string }
};

type state = {
  editor: ref(option(CodeMirror.editor))
};

let setMarks = (editor, marks: list(mark)) =>
  editor^ |> Option.forEach(
    editor => 
      marks |> Array.fromList
            |> CodeMirror.setMarks(editor)
  );

let component = ReasonReact.reducerComponent("Editor");
let make = (~value, ~lang, ~defaultValue=?, ~marks=[], ~readOnly=false, ~inputRef=?, ~onChange=?, _) => {
  ...component,

  initialState: () => {
    editor: ref(None)
  },

  reducer: ((), _state) => ReasonReact.NoUpdate,

  didUpdate: ({ newSelf }) => {
    setMarks(newSelf.state.editor, marks);
  },

  render: ({ handle }) =>
    <div className=EditorStyles.container>
      <CodeMirror
        value
        editorDidMount=(handle((editor, { state }) => state.editor := Some(editor)))
        ref=?inputRef
        ?defaultValue
        ?onChange
        options={
          "mode":           _langToMode(lang),
          "theme":          "material",
          "lineNumbers":    true,
          "readOnly":       Js.Boolean.to_js_boolean(readOnly),
          "scrollbarStyle": "simple"
        }
      />
    </div>

};
