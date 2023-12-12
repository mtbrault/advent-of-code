const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const lines = input.split('\n').map((line) => line.split(''));

const emptyLines = [];
const galaxies = [];
const emptyCols = [];

for (let y = 0; y < lines.length; y += 1) {
  const { nbDot, galaxyCoords } = lines[y].reduce((acc, value, x) => ({
    nbDot: acc.nbDot + (value === '.' ? 1 : 0),
    galaxyCoords: value === '#' ? [...acc.galaxyCoords, { x, y }] : acc.galaxyCoords,
  }), { nbDot: 0, galaxyCoords: [] });
  if (nbDot === lines[y].length) {
    emptyLines.push(y);
  }
  galaxies.push(...galaxyCoords);
}

for (let x = 0; x < lines[0].length; x += 1) {
  let nbDot = 0;
  for (let y = 0; y < lines.length; y += 1) {
    nbDot += lines[y][x] === '.' ? 1 : 0;
  }
  if (nbDot === lines.length) {
    emptyCols.push(x);
  }
}
const result = (voidSize) => _.chain(galaxies)
  .map((galaxy, index, arr) => {
    const { x, y } = galaxy;
    const res = [];
    for (let i = index + 1; i < arr.length; i += 1) {
      const { x: x2, y: y2 } = arr[i];
      let xDiff = Math.abs(x2 - x);
      let yDiff = Math.abs(y2 - y);
      const xEmpty = emptyCols.reduce((acc, value) => acc + (
        (x2 < value && x > value) || (x2 > value && x < value) ? voidSize - 1 : 0
      ), 0);
      const yEmpty = emptyLines.reduce((acc, value) => acc + (
        (y2 < value && y > value) || (y2 > value && y < value) ? voidSize - 1 : 0
      ), 0);
      xDiff += xEmpty;
      yDiff += yEmpty;
      res.push(xDiff + yDiff);
    }
    return res;
  })
  .flatten()
  .sum()
  .value();

console.log(
  'Part 1 soluce is',
  result(2),
);

console.log(
  'Part 2 soluce is',
  result(1000000),
);
