const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

const openChar = {
  '[': ']',
  '{': '}',
  '<': '>',
  '(': ')',
};

const illegalCharPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const closingCharPoints = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

console.log(
  'Part 1 soluce is ',
  _.chain(input)
    .map((line) => line.split('').reduce((acc, value, i) => {
      if (_.isNumber(acc)) return acc;
      if (openChar[value]) return i === line.length - 1 ? 0 : [...acc, value];
      if (openChar[_.last(acc)] === value) return i === line.length - 1 ? 0 : acc.slice(0, -1);
      return illegalCharPoints[value];
    }, []))
    .sum()
    .value(),
);

const getClosingCharPoints = (array) => array.reverse().reduce(
  (acc, value) => acc * 5 + closingCharPoints[value],
  0,
);

const part2 = _.chain(input)
  .map((line) => line.split('').reduce((acc, value, i) => {
    const last = i === line.length - 1;
    if (_.isNumber(acc)) return acc;
    if (openChar[value]) return last ? getClosingCharPoints([...acc, value]) : [...acc, value];
    if (openChar[_.last(acc)] === value) {
      return last
        ? (getClosingCharPoints(acc.slice(0, -1)))
        : acc.slice(0, -1);
    }
    return -1;
  }))
  .filter((val) => val !== -1)
  .sortBy()
  .value();

console.log(
  'Part 2 soluce is ',
  part2[Math.floor(part2.length / 2)],
);
