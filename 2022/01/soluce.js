const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

// Part 1 soluce
console.log(
  'Part 1 soluce',
  _.chain(input)
    .split('\n\n')
    .map((elf) => _.sumBy(elf.split('\n'), Number))
    .sortBy()
    .last()
    .value(),
);

// Part 2 soluce
console.log(
  'Part 2 soluce',
  _.chain(input)
    .split('\n\n')
    .map((elf) => _.sumBy(elf.split('\n'), Number))
    .sortBy()
    .splice(-3)
    .sum()
    .value(),
);
