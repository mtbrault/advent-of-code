const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' }).split('\n');

const paths = _.flatten(input.map((line) => [line.split('-'), line.split('-').reverse()]));

const isUpper = (char) => char.toUpperCase() === char;

const findPath = (current, found, part1 = true) => {
  const currentNode = _.last(current);
  if (currentNode === 'end') {
    found.push(current);
  }
  for (const path of paths) {
    if (path[0] === currentNode) {
      if (isUpper(path[1]) || !current.includes(path[1])) {
        findPath([...current, path[1]], found, part1);
      } else if (!isUpper(path[1]) && current.includes(path[1]) && !part1) {
        findPath([...current, path[1]], found, part1);
      }
    }
  }
  return found;
};

console.log(
  'Part 1 soluce is ',
  findPath(['start'], []).length,
);

console.log(
  'Part 2 soluce is ',
  findPath(['start'], [], false).length,
);
