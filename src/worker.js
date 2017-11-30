importScripts('../static/stdlibBundle.js');

const Benchmark = require('benchmark');

onmessage = ({ data }) => {
  var suite = new Benchmark.Suite;

  data.forEach(({ name, code }) =>
    suite.add(name, {
      setup: `
        var exports = this.exports = {};
        ${code}
      `,
      fn: function () {
        this.exports.__test__();
      },
      onCycle: ({ target: { name, hz, stats }}) => {
        postMessage({ type: "caseCycle", contents: {
          id: name,
          hz: hz,
          sampleCount: stats.sample.length,
          rme: stats.rme
        }})
      },
      onError: console.log
    }));

  suite.on('cycle', function({ target: { name, hz, stats }}) {
    postMessage({ type: "suiteCycle", contents: {
      id: name,
      hz: hz,
      sampleCount: stats.sample.length,
      rme: stats.rme
    }})
  })
  .on('complete', function() {
    postMessage({ type: "complete", contents: this.filter('fastest').map('name') })
  })
  .run({ 'async': true });
};