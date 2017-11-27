open Rebase;

type editor;

[@bs.module "react-codemirror2"] external codeMirror : ReasonReact.reactClass = "Controlled";


[%%bs.raw {|
  function setMarks(editor, marks) {
    editor.getAllMarks().forEach(function (mark) {
      mark.clear();
    });

    marks.forEach(function (mark) {
      editor.markText(mark.from, mark.to, mark.options);
    });
  }
|}];
[@bs.val] external setMarks: (editor, array(Js.t({..}))) => unit = "";
let setMarks = setMarks;

let make =
    (
      ~style: option(Js.t({..}))=?,
      ~value: option(string)=?,
      ~defaultValue: option(string)=?,
      ~editorDidMount: option(editor => unit)=?,
      ~onChange: option(string => unit)=?,
      ~options: option(Js.t({..}))=?,
      children
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=codeMirror,
    ~props={
      "style": Js.Undefined.from_opt(style),
      "value": Js.Undefined.from_opt(value),
      "defaultValue": Js.Undefined.from_opt(defaultValue),
      "editorDidMount": Js.Undefined.from_opt(editorDidMount),
      "onBeforeChange": onChange |> Option.mapOr(f => (_, _, value) => f(value), (_, _, _) => ()),
      "options": Js.Undefined.from_opt(options)
    },
    children
  );
