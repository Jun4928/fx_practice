const { unique, uniqueBy, go } = require('fxjs');
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

const uniqueKeywords = go(
  keywords,
  L.map(({ keyword_name }) => keyword_name),
  makeSet,
);

console.log(uniqueKeywords);
// const k = 'asd';
// const kk = 'cool';

// console.log(uniqueKeywords.includes(k));
// console.log(uniqueKeywords.includes(kk));
