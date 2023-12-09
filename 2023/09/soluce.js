const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const getMissingNumber1 = (line) => {
  const result = _.range(0, line.length - 1).map((__, i) => line[i + 1] - line[i]);

  return result.some((val) => val !== 0)
    ? getMissingNumber1(result) + _.last(line)
    : _.last(line);
};

console.log(
  'Part 1 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => line.split(' ').map(Number))
    .map(getMissingNumber1)
    .sum()
    .value(),
);

const getMissingNumber2 = (line) => {
  const result = _.range(0, line.length - 1).map((__, i) => line[i + 1] - line[i]);
  return result.some((val) => val !== 0)
    ? _.first(line) - getMissingNumber2(result)
    : _.first(line);
};

console.log(
  'Part 2 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => line.split(' ').map(Number))
    .map(getMissingNumber2)
    .sum()
    .value(),
);
