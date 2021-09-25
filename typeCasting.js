const { go, tap, log, pipe, map, curryN, entries, object } = require('fxjs')
const L = require('fxjs/Lazy')

const typeCasting = curryN(2, (target, type, obj) =>
  go(
    obj,
    L.entries,
    L.map(([k, v]) => [k, k === target ? type(v) : v]),
    object
  )
)

const arr = [
  {
    name: 'cool',
    count: '3',
  },
  {
    name: 'hey',
    count: '5',
  },
  {
    name: 'good!',
    count: '7',
  },
]

go(arr, map(typeCasting('count', Number)), log)
