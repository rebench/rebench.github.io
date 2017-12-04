importScripts('../static/stdlibBundle.js');

const Benchmark = require('benchmark');

onmessage = ({ data }) => {
  var suite = new Benchmark.Suite;

  data.forEach(({ name, code }) => {
    suite.add(name, {
      setup: `
        var exports = this.exports = {};
        ${code}
      `,
      fn: function () {
        this.exports.__test__();
      },
      onCycle: ({ target: { name, hz, stats, error }}) => {
        if (!error) {
          postMessage({ type: "testCycle", contents: {
            id: name,
            hz: hz,
            sampleCount: stats.sample.length,
            rme: stats.rme
          }})
        }
      },
      onError: e => {
        postMessage({ type: "testError", contents: { id: name, error: String(e.message) }})
      }
    })
  });

  suite.on('cycle', ({ target: { name, hz, stats, error }}) => {
    if (!error) {
      postMessage({ type: "suiteCycle", contents: {
        id: name,
        hz: hz,
        sampleCount: stats.sample.length,
        rme: stats.rme
      }})
    }
  })
  .on('complete', function ({ target: { error }}) {
    if (!error) {
      postMessage({ type: "complete", contents: this.filter('fastest').map('name') });
    }
  })
  .run({ 'async': true });
};