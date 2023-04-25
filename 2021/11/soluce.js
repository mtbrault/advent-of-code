/* eslint-disable no-param-reassign */
const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' }).split('\n').map((line) => line.split('').map(Number));

const flashes = (array, x, y) => {
  let flashesCoords = [{ x, y }];
  const coords = [
    [y, x - 1],
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y + 1, x + 1],
    [y + 1, x],
    [y + 1, x - 1],
  ];
  for (const coord of coords) {
    if (coord[0] < array.length && coord[0] >= 0 && coord[1] < array[0].length && coord[1] >= 0) {
      array[coord[0]][coord[1]] += 1;
      if (array[coord[0]][coord[1]] === 10) {
        flashesCoords = [...flashesCoords, ...flashes(array, coord[1], coord[0])];
        array[coord[0]][coord[1]] = 0;
      }
    }
  }
  return flashesCoords;
};

const simulate = (nbStep) => {
  const array = _.cloneDeep(input);
  let result = 0;
  let flashesCoords = [];
  for (let s = 1; s <= nbStep; s += 1) {
    for (let y = 0; y < array.length; y += 1) {
      for (let x = 0; x < array[y].length; x += 1) {
        array[y][x] += 1;
        if (array[y][x] === 10) {
          flashesCoords.push(...flashes(array, x, y));
          array[y][x] = 0;
        }
      }
    }
    flashesCoords.forEach(({ x, y }) => {
      array[y][x] = 0;
    });
    result += flashesCoords.length;
    if (flashesCoords.length === array.length * array[0].length && nbStep === Infinity) {
      return s;
    }
    flashesCoords = [];
  }
  return result;
};

console.log(
  'Part 1 soluce is ',
  simulate(100),
);

console.log(
  'Part 2 soluce is ',
  simulate(Infinity),
);
