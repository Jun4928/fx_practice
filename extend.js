const { go, map, extend, extendRight, defaults, tap, log } = require('fxjs')

const arr = [
  {
    name: 'a',
  },
  {
    name: 'b',
  },
  {
    name: 'c',
  },
]

const obj = {
  a: {
    count: 1,
  },
  c: {
    count: 3,
  },
}

go(
  arr,
  map(extendRight({ count: 0 })),
  map(user => extendRight(obj[user.name], user)),
  log
)

log(defaults({ a: 3 }, { a: 1, b: 2 }))
log(extend({ a: 3 }, { a: 1, b: 2 }))
log(extendRight({ a: 3 }, { a: 1, b: 2 }))
log(defaults({ a: 3 })) // { a: 3 }
log(extend({ a: 3 })) // { a: 3 }
log(extendRight({ a: 3 })) // Function 즉 뒤에 들어오는 객체로 부터 왼쪽으로 extend 한다. 객체에 디폴트값 넣을 때 유용 함

// 배열에 extendRight 로 default 값 넣어두고,
// extend 로 왼쪽에서 오른쪽으로 확장 시키면, default 로 넣어준 값이 덮어쓰여진다.
