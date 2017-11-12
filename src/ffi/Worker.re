open Rebase;

type t = {
  postMessage: 'a. Js.t({..} as 'a) => unit
};

type _worker;

[@bs.new] external _makeWorker : string => _worker = "Worker";
[@bs.set] external _onmessage : _worker => (Js.t({..}) => unit) => unit = "onmessage";
[@bs.set] external _onerror : _worker => (string => unit) => unit = "onerror";
[@bs.send] external _postMessage : _worker => Js.t({..}) => unit = "postMessage";

let make = (~onMessage, ~onError) => {
  let timeoutId = ref(None);
  let worker = _makeWorker("../build/worker.js");

  _onmessage(worker, (message) => {
    if (message##_type == "end") {
      timeoutId.contents |> Option.forEach(Js.Global.clearTimeout);
    } else {
      onMessage(message);
    }
  });
  _onerror(worker, onError);

  {
    postMessage: (message) =>
      _postMessage(worker, message)
  }
};
