const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [stack, commands] = input.split('\n\n');

const chunked = _.chunk(stack, 4);
const size = _.last(chunked)[1];
const crates = [];

for (let i = 0; i < chunked.length; i += 1) {
  if (i < size) {
    crates.push([]);
  }
  if (chunked[i][0] === '[' && chunked[i][2] === ']') {
    crates[i % size].push(chunked[i][1]);
  }
}

console.log(
  'Part 1 soluce is ',
  _.chain(commands)
    .split('\n')
    .reduce((crateStack, command) => {
      const splited = command.split(' from ');
      const nbToMove = Number(splited[0].substring('move '.length));
      const [from, to] = splited[1].split(' to ').map(Number);
      for (let i = 0; i < nbToMove; i += 1) {
        crateStack[to - 1].unshift(crateStack[from - 1].shift());
      }
      return crateStack;
    }, _.cloneDeep(crates))
    .reduce((answer, crate) => answer + crate[0], '')
    .value(),
);

console.log(
  'Part 2 soluce is ',
  _.chain(commands)
    .split('\n')
    .reduce((crateStack, command) => {
      const splited = command.split(' from ');
      const nbToMove = Number(splited[0].substring('move '.length));
      const [from, to] = splited[1].split(' to ').map(Number);
      const toAppend = [];
      for (let i = 0; i < nbToMove; i += 1) {
        toAppend.push(crateStack[from - 1].shift());
      }
      crateStack[to - 1] = [...toAppend, ...crateStack[to - 1]];
      return crateStack;
    }, _.cloneDeep(crates))
    .reduce((answer, crate) => answer + crate[0], '')
    .value(),
);
