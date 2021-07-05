const L = require('fxjs/Lazy');
const { each, go, reduce } = require('fxjs');
/**
 *
 * code 를 통해서 iterator 를 만들 수 있기 때문에
 * 어떠한 값이든 이터러블 하게 다룰 수 있다.
 * LIST 로 사고할 수 있다!
 */
const g1 = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield 10;
    if (false) yield 20 + 30;
    yield 30;
  }
};

console.log([...L.take(3, g1(10))]);

const add = (a, b) => a + b;
go(g1(10), L.take(2), reduce(add), console.log);
