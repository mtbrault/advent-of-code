const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const lanterfish = input.split(',').map(Number);

const simulate = (nbOfDays) => {
  const counted = _.countBy(lanterfish);
  const counter = [];
  for (let i = 0; i <= 8; i += 1) counter.push(counted[i] || 0);
  for (let i = 0; i < nbOfDays; i += 1) {
    const toAppend = counter[0];
    for (let s = 0; s < counter.length - 1; s += 1) {
      counter[s] = counter[s + 1];
    }
    counter[counter.length - 1] = toAppend;
    counter[6] += toAppend;
  }
  return _.sum(counter);
};

console.log(
  'Part 1 soluce is ',
  simulate(80),
);

console.log(
  'Part 2 soluce is ',
  simulate(256),
);
