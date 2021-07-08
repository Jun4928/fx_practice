const { go, reduce, filter, each, takeAll, log } = require('fxjs');
const L = require('fxjs/Lazy');

const m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

go(
  m,
  filter(([k, v]) => v % 2),
  (entries) => new Map(entries),
  log,
);

const s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;

go(s, reduce(add), log);
