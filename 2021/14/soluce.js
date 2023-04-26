/* eslint-disable no-loop-func */
const fs = require('fs');
const _ = require('lodash');

const [sequence, instructionList] = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' }).split('\n\n');
const instructions = {};
instructionList.split('\n').forEach((value) => {
  const [pair, toInsert] = value.split(' -> ');
  instructions[pair] = toInsert;
});

const countedPairs = _.countBy(sequence.split('').map((val, i, arr) => `${val}${arr[i + 1]}`).slice(0, -1));

const simulate = (nbStep) => {
  let pairs = _.cloneDeep(countedPairs);
  for (let s = 1; s <= nbStep; s += 1) {
    const futurePairs = {};
    Object.keys(pairs).forEach((pair) => {
      const toInsert = instructions[pair];
      if (toInsert) {
        futurePairs[pair[0] + toInsert] = (futurePairs[pair[0] + toInsert] || 0) + pairs[pair];
        futurePairs[toInsert + pair[1]] = (futurePairs[toInsert + pair[1]] || 0) + pairs[pair];
      } else {
        futurePairs[pair] = (futurePairs[pair] || 0) + pairs[pair];
      }
    });
    pairs = futurePairs;
  }
  const count = Object.keys(pairs)
    .reduce((acc, pair) => ({ ...acc, [pair[0]]: (acc[pair[0]] || 0) + pairs[pair] }), {});
  count[_.last(sequence)] += 1;
  return _.max(Object.values(count)) - _.min(Object.values(count));
};

console.log(
  'Part 1 soluce is ',
  simulate(10),
);

console.log(
  'Part 2 soluce is ',
  simulate(40),
);
