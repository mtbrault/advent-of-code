const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const redCube = 12;
const greenCube = 13;
const blueCube = 14;

console.log(
  'Part 1 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => {
      const [gameId, values] = line.split(':');
      const games = values.split(';');
      return games.some((game) => {
        const cubes = game.split(',');
        return cubes.some((cube) => {
          const val = parseInt(cube, 10);
          if (cube.includes('red') && val > redCube) return true;
          if (cube.includes('green') && val > greenCube) return true;
          if (cube.includes('blue') && val > blueCube) return true;
          return false;
        });
      }) ? 0 : Number(gameId.split(' ')[1]);
    })
    .sum()
    .value(),
);

console.log(
  'Part 2 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => {
      const [, values] = line.split(':');
      const games = values.split(';');
      const { maxRed, maxBlue, maxGreen } = games.reduce((acc, game) => {
        const cubes = game.split(',');
        let red = acc.maxRed;
        let green = acc.maxGreen;
        let blue = acc.maxBlue;
        cubes.forEach((cube) => {
          const val = parseInt(cube, 10);
          if (cube.includes('red') && val > red) red = val;
          if (cube.includes('green') && val > green) green = val;
          if (cube.includes('blue') && val > blue) blue = val;
        });
        return {
          maxRed: red,
          maxGreen: green,
          maxBlue: blue,
        };
      }, { maxRed: 0, maxBlue: 0, maxGreen: 0 });
      return maxRed * maxBlue * maxGreen;
    })
    .sum()
    .value(),
);
