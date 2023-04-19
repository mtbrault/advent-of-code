const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const getCharValue = (char) => char.charCodeAt(0) - (char === char.toUpperCase() ? 38 : 96);

console.log(
  'Part 1 soluce is ',
  _.chain(input)
    .split('\n')
    .map((line) => {
      const secondRucksack = line.slice(line.length / 2);
      return line.slice(0, line.length / 2).split('').find((item) => secondRucksack.includes(item));
    })
    .reduce((sum, value) => sum + getCharValue(value), 0)
    .value(),
);

console.log(
  'Part 2 soluce is ',
  _.chain(input)
    .split('\n')
    .chunk(3)
    .map((group) => group[0].split('').find((char) => group[1].includes(char) && group[2].includes(char)))
    .reduce((sum, value) => sum + getCharValue(value), 0)
    .value(),
);
