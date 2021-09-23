const { go, map, stopIf, pipeS, pipe, object, replace, isString, entries, log } = require('fxjs');

const tests = [
  {
    name: '--구구구구--',
    id: 3,
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: '"크크크크"',
    id: 1,
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: `--"곱창 라면''--`,
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: '--곱창 =<>대창--',
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: '--삼성<>sp_ xp_ 엘지--',
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: '엘지"cmdshell아이폰(()',
    from: '2021-06-01',
    to: '2021-06-08',
  },
  {
    name: '(union), drop 아이폰#애플;;',
    from: '2021-06-01',
    to: '2021-06-08',
    id: 3,
  },
];

const SQL_INJECTION_CHARS_REGEXP = /'|"|=|<|>|\(|\)|union|sp_|xp_|select|drop|union|--|#|;|cmdshell/gi;

const filterSQLIjection = pipeS(
  stopIf((v) => !isString(v)),
  replace(SQL_INJECTION_CHARS_REGEXP, ''),
);

// const sqlInjectionPrevention = (query) => {
//   return go(
//     query,
//     entries,
//     map(([k, v]) => [k, filterSQLIjection(v)]),
//     object,
//     log,
//   );
// };

const sqlInjectionPrevention = pipe(
  entries,
  map(([k, v]) => [k, filterSQLIjection(v)]),
  object,
  log,
);

tests.map(sqlInjectionPrevention);
