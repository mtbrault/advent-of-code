const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const map = input.split('\n').map((line) => line.split(''));

const partNumbers = [];

const isSymoblNear = (y, x) => {
  const noSymbol = [..._.range(0, 10).map((n) => n.toString()), '.'];
  if (y > 0 && !noSymbol.includes(map[y - 1][x])) return true;
  if (y > 0 && x > 0 && !noSymbol.includes(map[y - 1][x - 1])) return true;
  if (y < map.length - 1 && !noSymbol.includes(map[y + 1][x])) return true;
  if (y < map.length - 1 && x > 0 && !noSymbol.includes(map[y + 1][x - 1])) return true;
  if (x > 0 && !noSymbol.includes(map[y][x - 1])) return true;
  if (y > 0 && x < map[y].length - 1 && !noSymbol.includes(map[y - 1][x + 1])) return true;
  if (x < map[y].length - 1 && !noSymbol.includes(map[y][x + 1])) return true;
  if (y < map.length - 1 && x < map[y].length - 1
    && !noSymbol.includes(map[y + 1][x + 1])) return true;
  return false;
};

for (let y = 0; y < map.length; y += 1) {
  let number = '';
  let currentIsPart = false;
  for (let x = 0; x < map[y].length; x += 1) {
    if (map[y][x] >= '0' && map[y][x] <= '9') {
      number += map[y][x];
      if (isSymoblNear(y, x)) {
        currentIsPart = true;
      }
      if (currentIsPart && x === map[y].length - 1) {
        partNumbers.push(Number(number));
      }
    } else {
      if (currentIsPart) {
        partNumbers.push(Number(number));
      }
      number = '';
      currentIsPart = false;
    }
  }
}

console.log(
  'Part 1 soluce is',
  _.sum(partNumbers),
);

const part2Start = process.hrtime();

const numberPositions = [];
const starPositions = [];

for (let y = 0; y < map.length; y += 1) {
  let number = '';
  let positionFrom = null;
  for (let x = 0; x < map[y].length; x += 1) {
    if (map[y][x] >= '0' && map[y][x] <= '9') {
      number += map[y][x];
      if (positionFrom === null) positionFrom = x;
      if (x === map[y].length - 1) {
        numberPositions.push({
          number: Number(number), y, from: positionFrom, to: x,
        });
        number = '';
        positionFrom = null;
      }
    } else if (number !== '') {
      numberPositions.push({
        number: Number(number), y, from: positionFrom, to: x - 1,
      });
      number = '';
      positionFrom = null;
    }
    if (map[y][x] === '*') {
      starPositions.push({ y, x });
    }
  }
}

const res = _.chain(starPositions)
  .map(({ x, y }) => {
    const numbers = numberPositions.filter((n) => {
      if (![y - 1, y, y + 1].includes(n.y)) return false;
      const xRanges = _.range(n.from, n.to + 1);
      return [x - 1, x, x + 1].some((xPos) => xRanges.includes(xPos));
    });
    return numbers.length > 1 ? numbers.reduce((acc, value) => (acc || 1) * value.number, 0) : 0;
  })
  .sum()
  .value();

const part2EndTime = process.hrtime(part2Start);
const duration = part2EndTime[0] * 1000 + part2EndTime[1] / 1e6;

console.log(
  'Part 2 soluce is',
  res,
  `in ${duration}ms`,
);
