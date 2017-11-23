open Rebase;

module type Config = {
  type input;
  type output;
  let compute: input => output;
};

module Make(Config: Config) = {
  type state = {
    output: Config.output,
    timeout: ref(option(Js.Global.timeoutId))
  };
  type retainedProps = {
    input: Config.input
  };

  let component = ReasonReact.reducerComponentWithRetainedProps("Debounce");
  let make = (~input, ~wait, renderChildren) => {
    ... component,

    initialState: () => {
      output: Config.compute(input),
      timeout: ref(None)
    },

    retainedProps: { input: input },

    didUpdate: ({ oldSelf, newSelf }) => {
      if (newSelf.retainedProps.input !== oldSelf.retainedProps.input) {
        let { timeout } = newSelf.state;

        timeout^ |> Option.forEach(id => {
          Js.Global.clearTimeout(id);
          timeout := None;
        });

        timeout := Some(Js.Global.setTimeout(() => {
          timeout := None;
          newSelf.reduce(() => input |> Config.compute)();
        }, wait));
      }
    },
    
    reducer: (output, state) =>
      ReasonReact.Update({ ...state, output }),


    render: ({ state }) =>
      renderChildren(state.output)
  };
};