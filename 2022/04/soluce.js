const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

console.log(
  'Part 1 soluce is ',
  _.chain(input)
    .split('\n')
    .filter((line) => {
      const [firstRange, secondRange] = line.split(',');
      const [min1, max1] = firstRange.split('-').map(Number);
      const [min2, max2] = secondRange.split('-').map(Number);

      return (min1 <= min2 && max2 <= max1) || (min2 <= min1 && max1 <= max2);
    })
    .size()
    .value(),
);

console.log(
  'Part 2 soluce is ',
  _.chain(input)
    .split('\n')
    .filter((line) => {
      const [firstRange, secondRange] = line.split(',');
      const [min1, max1] = firstRange.split('-').map(Number);
      const [min2, max2] = secondRange.split('-').map(Number);

      return (min1 <= min2 && min2 <= max1) || (min2 <= min1 && min1 <= max2);
    })
    .size()
    .value(),
);
