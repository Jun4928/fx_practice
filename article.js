const arr = [1, 2, 3, 4, 5];

const curry =
  (fn) =>
  (a, ...args) =>
    args.length ? fn(a, ...args) : (...args) => fn(a, ...args);

const plusOne = (a) => a + 1;
const odd = (a) => a % 2;

const map = curry((f, iter) => {
  let res = [];
  for (const el of iter) {
    // iterable 객체를 순회합니다.
    res.push(f(el)); // 첫번째 인자로 넘겨받은 f 함수를 적용해서 push 합니다.
  }

  return res; // 새로운 배열을 리턴합니다. 즉, iter 값에는 영향이 없습니다.
});

const filter = curry((f, iter) => {
  let res = [];
  for (const el of iter) {
    // iterable 객체를 순회합니다.
    if (f(el)) res.push(el);
    // 첫번째 인자로 넘겨받은 f 함수를 적용해서 truthy 할 때만, push 합니다.
  }

  return res; // 새로운 배열을 리턴합니다. 즉, iter 값에는 영향이 없습니다.
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) acc = f(acc, el); // iterable 객체를 순회합니다.
  // 첫번째 인자로 넘겨받은 함수 f 에 recursive 하게 축적된 값(acc)과 원소를(el)
  // 넘겨서 acc 에 저장합니다.

  return acc; // 새롭게 축적된 하나의 값을 리턴합니다. 즉, iter 값에는 영향이 없습니다.
});

const log = console.log;
const add = curry((a, b) => a + b);

const go = (iter, ...fns) => reduce((acc, fn) => fn(acc), iter, fns);

const pipe =
  (fn, ...fns) =>
  (...values) =>
    go(fn(...values), ...fns);

const people = [
  { name: 'a', age: 20, score: 100 },
  { name: 'b', age: 19, score: 95 },
  { name: 'c', age: 23, score: 80 },
  { name: 'd', age: 18, score: 90 },
];

go(
  arr,
  (arr) => map(plusOne, arr),
  (arr) => filter(odd, arr),
  (arr) => reduce(add, arr),
  log,
);

go(
  arr,
  (arr) => map(plusOne)(arr),
  (arr) => filter(odd)(arr),
  (arr) => reduce(add)(arr),
  log,
);

go(arr, map(plusOne), filter(odd), reduce(add), log);

const doSomething = (v) => {
  console.log(`짜잔! ${v} 이제 함수를 자유자재로 조합 할 수 있습니다.`);
  return v;
};

const res = go(arr, map(plusOne), filter(odd), reduce(add), doSomething);

console.log(res);

const res2 = go(
  people,
  filter(({ score }) => score >= 90),
  map(({ name }) => name),
  doSomething,
);

console.log(res2);
