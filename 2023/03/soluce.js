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

`...5.5...
 ....*....`;

`...55...
 ....*...`;

console.log(
  'Part 1 soluce is',
  partNumbers,
  _.sum(partNumbers),
);
