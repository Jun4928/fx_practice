const {
  log,
  tap,
  noop,
  groupBy,
  go,
  each,
  entries,
  map,
  pipe,
  reduce,
  sortByDesc,
  sumBy,
  merge,
  zip,
  zipObj,
  union,
  flat,
} = require('fxjs');

const stats = [
  {
    keyword_name: 'a',
    cnt: 11,
    price: 10,
  },
  {
    keyword_name: 'c',
    cnt: 22,
    price: 20,
  },
  {
    keyword_name: 'b',
    cnt: 33,
    price: 30,
  },
  {
    keyword_name: 'a',
    cnt: 44,
    price: 10,
  },
  {
    keyword_name: 'b',
    cnt: 55,
    price: 30,
  },
  {
    keyword_name: 'c',
    cnt: 66,
    price: 20,
  },
];

const group = go(
  stats,
  groupBy(({ keyword_name }) => keyword_name),
  entries,
  map(([k, keywordStats]) =>
    go(
      keywordStats,
      reduce(
        (acc, keyword) => (
          go(
            keyword,
            entries,
            each(([k, v]) => (acc[k] = typeof v === 'number' ? acc[k] + v : acc[k])),
          ),
          acc
        ),
      ),
    ),
  ),
  sortByDesc(({ cnt, price }) => [cnt, price]),
);

const nonAdStats = [1, 2, 3];

console.log(go([group, nonAdStats], flat));
