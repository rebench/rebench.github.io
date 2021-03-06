open Rebase;

let makeCounter = init => {
  let i = ref(init - 1);

  () => {
    i := i^ + 1;
    i^
  }
};

let formatNumber : string => string = [%raw {|
function (number) {
  number = String(number).split('.');

  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
}
|}];

let debounce = (f, wait) => {
  let timeout = ref(None);

  (data) => {
    timeout^ |> Option.forEach(id => {
      Js.Global.clearTimeout(id);
      timeout := None;
    });

    timeout := Some(Js.Global.setTimeout(() => {
      timeout := None;
      f(data)
    }, wait));
  }
}