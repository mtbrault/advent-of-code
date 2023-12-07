const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [times, distances] = input.split('\n');

const timeMap = _.chain(times).split('Time:')
  .get(1)
  .split(' ')
  .filter((v) => v !== '')
  .map(Number)
  .value();

const distancesMap = _.chain(distances).split('Distance:').get(1).split(' ')
  .filter((v) => v !== '')
  .map(Number)
  .value();

console.log(
  'Part 1 soluce is',
  _.chain(timeMap)
    .map((raceTime, index) => _
      .range(1, raceTime - 1)
      .filter((time) => ((raceTime - time) * time > distancesMap[index]))
      .length)
    .reduce((acc, value) => acc * value, 1)
    .value(),
);

const part2Time = Number(timeMap.reduce((acc, value) => acc + value.toString(), ''));

const part2Distance = Number(distancesMap.reduce((acc, value) => acc + value.toString(), ''));

console.log(
  'Part 2 soluce is',
  _.range(1, part2Time - 1)
    .filter((time) => ((part2Time - time) * time > part2Distance))
    .length,
);
