const { go, reduce } = require('fxjs');
const L = require('fxjs/Lazy');

const a = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];

// const object = (entries) =>
//   go(
//     entries,
//     L.map(([k, v]) => ({ [k]: v })),
//     reduce(Object.assign),
//   );

const object = (entries) => reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

console.log(object(a));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

console.log(m);
console.log([...m[Symbol.iterator]()]);
console.log(object(m));
