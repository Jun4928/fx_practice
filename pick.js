const { go, object, curry } = require('fxjs')
const L = require('fxjs/Lazy')

const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }

const pick = curry((keys, obj) =>
  go(
    keys,
    L.map(k => [k, obj[k]]),
    L.reject(([k, v]) => v === undefined),
    object
  )
)

// undefined 는 값으로 정의하지 않는 것이 좋은 방향이다.
// 서버로부터 받을수도 없고, JSON.stringify 를 통해 평가 되었을 때 없는 값이 된다.
// 구분자로만 활용하고, 직접 값에 담는 것은 지양하는 것이 좋다.
console.log(pick(['b', 'c', 'z'], obj))
// { b: 2, c: 3}
