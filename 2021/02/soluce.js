const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const getSettings = (number) => ({
  forward: { horizontal: number, depth: 0 },
  down: { horizontal: 0, depth: number },
  up: { horizontal: 0, depth: number * -1 },
});

const part1 = input
  .split('\n')
  .reduce((acc, line) => {
    const [instruction, number] = line.split(' ');
    const { horizontal, depth } = getSettings(Number(number))[instruction];
    return { horizontal: acc.horizontal + horizontal, depth: acc.depth + depth };
  }, { horizontal: 0, depth: 0 });

console.log(
  'Part 1 soluce is ',
  part1.horizontal * part1.depth,
);

const part2 = input
  .split('\n')
  .reduce((acc, line) => {
    const [instruction, number] = line.split(' ');
    if (instruction === 'down') {
      return { ...acc, aim: acc.aim + Number(number) };
    }
    if (instruction === 'up') {
      return { ...acc, aim: acc.aim - Number(number) };
    }
    if (instruction === 'forward') {
      return {
        ...acc,
        horizontal: acc.horizontal + Number(number),
        depth: acc.depth + acc.aim * Number(number),
      };
    }
    return acc;
  }, { aim: 0, horizontal: 0, depth: 0 });

console.log(
  'Part 2 soluce is ',
  part2.horizontal * part2.depth,
);
