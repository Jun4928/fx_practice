const { both, go, all, every, cond, either } = require('fxjs');

const a = 1;

const res = go(
  a,
  both(
    (a) => a === 1,
    (a) => a === 2,
  ),
);

console.log(res);
