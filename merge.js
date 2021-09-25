const { go, map, extendRight, extend, curry, log, indexBy } = require('fxjs')
const L = require('fxjs/Lazy')

const users = [
  {
    u_id: 1,
    name: 'a',
  },
  {
    u_id: 2,
    name: 'b',
  },
  {
    u_id: 3,
    name: 'c',
  },
]

const countByUserId = [
  {
    u_id: 1,
    count: 1123,
  },
  {
    u_id: 3,
    count: 21390,
  },
]

const merge = curry(({ target, joinKey }, arr) => {
  const targetObj = go(
    target,
    indexBy(el => el[joinKey])
  )

  return go(
    arr,
    map(a => extend(a, targetObj[a[joinKey]]))
  )
})

go(
  users,
  map(extendRight({ count: 0 })),
  merge({ target: countByUserId, joinKey: 'u_id' }),
  log
)
