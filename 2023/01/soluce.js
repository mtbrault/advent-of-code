const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

console.log(
  'Part 1 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => _.filter(line, (char) => char >= '0' && char <= '9'))
    .map((line) => Number(_.first(line) + _.last(line)))
    .sum()
    .value(),
);

const getNumbers = (line) => {
  const values = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const result = [];
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] >= '0' && line[index] <= '9') {
      result.push(line[index]);
    }
    values.forEach((value, i) => {
      if (line.substring(index, index + value.length) === value) {
        result.push(i.toString());
      }
    });
    if (result[0]) break;
  }

  for (let index = line.length - 1; index >= 0; index -= 1) {
    if (line[index] >= '0' && line[index] <= '9') {
      result.push(line[index]);
    }
    values.forEach((value, i) => {
      if (line.substring(index - value.length + 1, index + 1) === value) {
        result.push(i.toString());
      }
    });
    if (result[1]) break;
  }
  return Number(result[0] + result[1]);
};

console.log(
  'Part 2 soluce is',
  _.chain(input).split('\n').map(getNumbers).sum()
    .value(),
);
