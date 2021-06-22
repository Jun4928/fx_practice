const { unique, uniqueBy, go, pipe } = require('fxjs');
const L = require('fxjs/Lazy');

const keywords = [
  {
    adseq: 1,
    keyword_name: 'cool',
  },
  {
    adseq: 2,
    keyword_name: 'cool',
  },
  {
    adseq: 3,
    keyword_name: 'hey',
  },
];

const makeSet = (arr) => new Set(arr);

const uniqueKeywords = pipe(
  L.map(({ keyword_name }) => keyword_name),
  makeSet,
);

console.log(go(keywords, uniqueKeywords));
// const k = 'asd';
// const kk = 'cool';

// console.log(uniqueKeywords.includes(k));
// console.log(uniqueKeywords.includes(kk));
