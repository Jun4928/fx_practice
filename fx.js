const log = console.log;
const L = {};

const curry =
  (f) =>
  (first, ...rest) =>
    rest.length ? f(first, ...rest) : (...rest) => f(first, ...rest);

L.range = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const el of iter) {
    yield f(el);
  }
});

L.filter = curry(function* (f, iter) {
  for (const el of iter) {
    if (f(el)) yield el;
  }
});

L.flat = function* (iter) {
  for (a of iter) {
    if (a && a[Symbol.iterator]) yield* a;
    else yield a;
  }
};

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = f(acc, el);
  }

  return acc;
});

const take = curry((l, iter) => {
  const res = [];
  for (const el of iter) {
    res.push(el);
    if (res.length === l) return res;
  }

  return res;
});

// const takeWhile = curry((f, iter) => {
//   const res = [];
//   for (const el of iter) {
//     if (!f(el)) return res; // f(el) => true 일 때만 계속해서 새로운 배열에 담겠다는 뜻!
//     res.push(el);
//   }

//   return res;
// });
const takeWhile = curry((f, iter) => {
  iter = iter[Symbol.iterator]();
  iter.return = null; // 비동기가 일어났을 때, 끝내지 않겠다(?)

  let res = [];
  return (function recur() {
    for (const a of iter) {
      const b = go1(a, f);
      if (!b) return res;
      // b 가 Promise 일 경우 then 으로 봐야함
      // true 일 때 배열에 await 로 resolve 시키고 push 그리고, 다시 recur()로 재귀 호출
      // false 일 때 함수 종료
      if (b instanceof Promise) return b.then(async (b) => (b ? (res.push(await a), recur()) : res));
      res.push(a);
    }

    return res;
  })();
});

const takeAll = (iter) => take(Infinity, iter);

const tap = curry((f, iter) => {
  f(iter);
  return iter;
});

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const go = (...args) => reduce(go1, args);

const add = (a, b) => a + b;

module.exports = {
  L,
  add,
  reduce,
  take,
  takeWhile,
  takeAll,
  tap,
  log,
  go1,
  go,
};
