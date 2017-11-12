let makeCounter = (init) => {
  let i = ref(init - 1);

  () => {
    i := i^ + 1;
    i^
  }
};

let formatNumber : string => string = [%raw {|
function formatNumber(number) {
  number = String(number).split('.');

  return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') + (number[1] ? '.' + number[1] : '');
}
|}];