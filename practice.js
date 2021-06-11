const {
  go,
  map,
  curryN,
  extend,
  sortByDesc,
  sortBy,
  range,
  slice,
  intersectionWith,
  unionWith,
  merge,
  cond,
  either,
  takeAll,
  defaultTo,
  pick,
  object,
  extendRight,
  each,
  tap,
  log,
} = require('fxjs')
const L = require('fxjs/Lazy')

const slice2 = curryN(2, slice)

// console.time('Plain')
// const plain = go(
//   range(10000),
//   map((a) => extend(a, { age: a + 1 })),
//   sortByDesc(({ age }) => age),
//   slice2(0, 50),
// )
// console.timeEnd('Plain')
// console.log(plain)

// const offset = 0
// const size = 50

// console.time('Lazy')
// const Lazy = go(
//   L.range(10000),
//   L.map((a) => ({ idx: a })),
//   L.map((a) => extend(a, { age: a.idx * 0.01 })),
//   sortBy(({ age }) => age),
//   size === 0 ? takeAll : slice2(offset, size),
// )
// console.timeEnd('Lazy')
// console.log(Lazy)

// const people = [
//   {
//     id: 1,
//     name: 'a',
//     age: 20,
//   },
//   {
//     id: 2,
//     name: 'b',
//     age: 30,
//   },
//   {
//     id: 3,
//     name: 'b',
//     age: 30,
//   },
//   {
//     id: 4,
//     name: 'b',
//     age: 30,
//   },
// ]

// const properties = [
//   {
//     owner_id: 3,
//     name: 'cool',
//   },
//   {
//     owner_id: 1,
//     name: 'good',
//   },
// ]

// console.log(intersectionWith((peo, ps) => peo.id === ps.owner_id, people, properties))
// console.log(merge(people, properties))

const erp = [
  {
    property_id: 1,
    ad_expect_expense: 100,
  },
  {
    property_id: 2,
    ad_expense: 20,
  },
  {
    property_id: 3,
    ad_expense: 30,
  },
  {
    property_id: 4,
    ad_expect_expense: 400,
    advertiser_cnt: 1000,
  },
]

const ERP_PLUCK_MAPPER = {
  areas: (item) => item.area_id,
  categories: (item) => item.stat_date,
  properties: (item) => item.property_id,
  'list-ads': (item) => `${item.parent_area_id}-${item.area_id}-${item.ad_slot_id}`,
}

const pluck = ERP_PLUCK_MAPPER['properties']

const data = [
  {
    property_id: 1,
    cool: 1,
  },
  {
    property_id: 2,
    cool: 2,
  },
  {
    property_id: 3,
    cool: 3,
  },
  {
    property_id: 4,
    cool: 4,
  },
]

const erpObj = go(
  erp,
  L.map((item) => [pluck(item), item]),
  object,
)

const DEFAULT_ERP = {
  ad_expense: 0,
  ad_expect_expense: 0,
  advertiser_cnt: 0,
}

const res = go(
  data,
  L.map((item) => [erpObj[pluck(item)], item]),
  L.map(([erp, item]) => [extend({ ...DEFAULT_ERP }, erp), item]),
  map(([erp, item]) => extend(erp, item)),
)

console.log(res)
