const { go, reduce, object } = require('fxjs');
const L = require('fxjs/Lazy');

const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 },
];

// const indexBy = (f, iter) =>
//   go(
//     iter,
//     L.map((obj) => [f(obj), obj]),
//     object,
//   );

const indexBy = (f, iter) => reduce((acc, obj) => ((acc[f(obj)] = obj), acc), {}, iter);

// O(n) 으로 순회하고, 이 후에 index(key) 를 통해 여러번 조회하는 상황에 사용하는 함수
// indexBy 는 reduce 를 통해서 만든다.
// 모두를 순회하면서, 전혀 다른 새로운 형태의 값으로 다시 만들어 내기 때문이다.
console.log(indexBy((u) => u.id, users));
const users2 = indexBy((u) => u.id, users);

// indexBy 된 값을 filter 하기
const users3 = go(
  users2,
  L.entries,
  L.filter(([k, { age }]) => age >= 30),
  L.take(1),
  object,
);

console.log(users3);
