const fs = require('fs');
const _ = require('lodash');

const part1Start = process.hrtime();
const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const part1 = input
  .split('\n')
  .map((card) => {
    const [winning, values] = card.split('|');
    const winningValues = winning.split(': ')[1].split(' ').map(Number);
    return values.split(' ').filter((v) => v !== '')
      .reduce((acc, value) => {
        if (winningValues.includes(Number(value))) {
          return acc === 0 ? 1 : acc * 2;
        }
        return acc;
      }, 0);
  });

const part1EndTime = process.hrtime(part1Start);

console.log(
  'Part 1 soluce is',
  _.sum(part1),
  `in ${part1EndTime[0] * 1000 + part1EndTime[1] / 1e6}ms`,
);

const part2Start = process.hrtime();

const copiesNb = input.split('\n').map(() => 1);

input
  .split('\n')
  .forEach((card, index) => {
    const [winning, values] = card.split('|');
    const winningValues = winning.split(': ')[1].split(' ').map(Number);
    const nbMatch = values.split(' ').filter((v) => v !== '')
      .reduce(
        (acc, value) => (winningValues.includes(Number(value)) ? acc + 1 : acc),
        0,
      );

    _.range(index + 1, index + 1 + nbMatch)
      .forEach((val) => {
        copiesNb[val] += copiesNb[index];
      });
  });

const endTime = process.hrtime(part2Start);
const duration = endTime[0] * 1000 + endTime[1] / 1e6;

console.log(
  'Part 2 soluce is',
  _.sum(copiesNb),
  `in ${duration}ms`,
);
