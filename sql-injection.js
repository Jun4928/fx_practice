const F = require('fxjs/Strict');
const L = require('fxjs/Lazy');

const SQL_INJECTION_CHARS_REGEXP = /'|"|=|<|>|\(|\)|union|sp_|xp_|select|drop|union|--|#|;|cmdshell|,|\s/gi;

const filterSQLInjection = function recur(v) {
  return F.goS(
    v,
    F.stopIf((v) => !F.isString(v)),
    F.replace(SQL_INJECTION_CHARS_REGEXP, ''),
    F.ifElse((s) => SQL_INJECTION_CHARS_REGEXP.test(s), recur, F.identity),
  );
};

const sqlInjectionPrevention = (req) => {
  const { query } = req;

  req.query = F.go(
    query,
    L.entries,
    L.map(([k, v]) => [k, filterSQLInjection(v)]),
    F.object,
  );

  return req;
};

const req = {
  query: {
    name: '(union), drop 아이폰#애플;;',
    from: '2021-06-01;',
    to: '=2021-06-08',
    recur: 'drdropop drop drop table a;;;',
    id: 3,
  },
};

console.log(sqlInjectionPrevention(req));
