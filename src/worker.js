importScripts('../static/stdlibBundle.js');

const Benchmark = require('benchmark');

onmessage = ({data}) => {
  exports = {};
  eval(data.code);

  var suite = new Benchmark.Suite;
  
  data.testCases.forEach(name =>
    suite.add(name, {
      fn: exports[name],
      onCycle: ({ target: { name, hz, stats }}) => {
        postMessage({ type: "caseCycle", contents: {
          id: name,
          hz: hz,
          sampleCount: stats.sample.length,
          rme: stats.rme
        }})
      }
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