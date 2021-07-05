const { go, curry, object } = require('fxjs');
const L = require('fxjs/Lazy');

const mapObject = curry((f, obj) =>
  go(
    obj,
    L.entries,
    L.map(([k, v]) => [k, f(v)]),
    object,
  ),
);

console.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));
// { a: 11, b: 12, c: 13}
