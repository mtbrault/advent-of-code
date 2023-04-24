const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const listOfPosition = _.sortBy(input.split(',').map(Number));

const min = _.min(listOfPosition);
const max = _.max(listOfPosition);

const factorialSum = (value) => _.sum([...Array(value)].map((__, i) => i + 1));

console.log(
  'Part 1 soluce is ',
  _.chain([...Array(max - min)])
    .map((__, i) => _.sumBy(listOfPosition, (value) => Math.abs(value - i + min)))
    .min()
    .value(),
);

console.log(
  'Part 2 soluce is ',
  _.chain([...Array(max - min)])
    .map((__, i) => _.sumBy(listOfPosition, (value) => factorialSum(Math.abs(value - i + min))))
    .min()
    .value(),
);
