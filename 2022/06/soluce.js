const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const getIndexOfNUniqChar = (n) => input
  .split('')
  .findIndex(
    (__, index, arr) => index > n - 1 && _
      .chain(arr)
      .slice(index - n, index)
      .uniq()
      .size()
      .value() === n,
  );

console.log(`Part 1 soluce is ${getIndexOfNUniqChar(4)}`);

console.log(`Part 1 soluce is ${getIndexOfNUniqChar(14)}`);
