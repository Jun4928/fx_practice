const {
  log,
  tap,
  noop,
  groupBy,
  go,
  omit,
  each,
  entries,
  map,
  pipe,
  reduce,
  sortBy,
  sortByDesc,
  sumBy,
  merge,
  zip,
  zipObj,
  union,
  flat,
  indexBy,
  values,
  object,
} = require('fxjs');
const L = require('fxjs/Lazy');

const stats = [
  {
    property_id: 1,
    keyword_name: 'a',
    cnt: 11,
    price: 10,
  },
  {
    property_id: 2,
    keyword_name: 'c',
    cnt: 22,
    price: 20,
  },
  {
    property_id: 3,
    keyword_name: 'b',
    cnt: 33,
    price: 30,
  },

  {
    property_id: 1,
    keyword_name: 'a',
    cnt: 44,
    price: 10,
  },
  {
    property_id: 2,
    keyword_name: 'b',
    cnt: 55,
    price: 30,
  },
  {
    property_id: 3,
    keyword_name: 'c',
    cnt: 66,
    price: 100,
  },
];

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

const group = go(
  stats,
  groupBy(({ property_id }) => property_id),
  L.values,
  L.map(L.map((stat) => omit(['property_id'], stat))),
  map(sumOfNumberProperties),
);

console.log(group);

const group2 = go(
  stats,
  groupBy(({ property_id }) => property_id),
  L.entries,
  L.map(([p_id, stats]) => [
    p_id,
    go(
      stats,
      L.map((stat) => omit(['property_id'], stat)),
      sumOfNumberProperties,
    ),
  ]),
  object,
);

console.log(group2);

// const nonAdStats = [1, 2, 3];

// console.log(go([group, nonAdStats], flat));
