let _toArray = Array.of_list;
open Rebase;

module Message = {
  type send =
    | Run(string, list(string));

  type receive =
    | CaseCycle(string, TestCase.result)
    | SuiteCycle(string, TestCase.result)
    | SuiteComplete;

  let _decodeReceived = (message) =>
    switch message##data##_type {
    
    | "caseCycle" => {
      let data = message##data##contents;
      CaseCycle(data##id, {
        hz: data##hz,
        sampleCount: data##sampleCount,
        rme: data##rme
      })
    }

    | "suiteCycle" =>
      let data = message##data##contents;
      SuiteCycle(data##id, {
        hz: data##hz,
        sampleCount: data##sampleCount,
        rme: data##rme
      })

    | "complete" =>
      SuiteComplete

    | _ =>
      failwith("unknown worker message")
    };
  
  let _encodeToSend =
    fun | Run(code, testCases) => { "code": code, "testCases": testCases |> _toArray };
};

type _worker;

[@bs.new] external _makeWorker : string => _worker = "Worker";
[@bs.set] external _onmessage : _worker => (Js.t({..}) => unit) => unit = "onmessage";
[@bs.set] external _onerror : _worker => (string => unit) => unit = "onerror";
[@bs.send] external _postMessage : _worker => Js.t({..}) => unit = "postMessage";

type t = {
  postMessage: Message.send => unit
};

let make = (~onMessage, ~onError) => {
  let timeoutId = ref(None);
  let worker = _makeWorker("../build/worker.js");

  _onmessage(worker, (message) => {
    if (message##_type == "end") {
      timeoutId.contents |> Option.forEach(Js.Global.clearTimeout);
    } else {
      message |> Message._decodeReceived
              |> onMessage;
    }
  });
  _onerror(worker, onError);

  {
    postMessage: (message) =>
      message |> Message._encodeToSend
              |> _postMessage(worker)
  }
};