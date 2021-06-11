const moment = require('moment')

const d1 = moment('2021-04-05')
const d2 = moment('2021-04-11')

console.log(d1)
console.log(d2)
console.log(d2.diff(d1, 'days'))
