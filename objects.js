const { go, values, entries, reduce, map, curry, sortByDesc, sortBy, sort, sortDesc } = require('fxjs');
const L = require('fxjs/Lazy');

const log = console.log;

const sumOfNumberProperties = reduce(
  (acc, keyword) => (
    go(
      keyword,
      entries,
      each(([k, v]) => (acc[k] = typeof v === 'number' ? acc[k] + v : acc[k])),
    ),
    acc
  ),
);

const obj1 = {
  a: {
    age: 10,
    name: 'a',
  },
  c: {
    age: 10,
    name: 'b',
  },
  d: {
    age: 100,
    name: 'c',
  },
};

const sorted = go(obj1, L.values, sortBy(['age', 'name']));

console.log(sorted);
