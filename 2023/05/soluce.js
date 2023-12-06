const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [seeds, ...map] = input.split('\n\n');
const conversions = map.map((line) => {
  const [names, ...values] = line.split('\n');
  const [from, to] = _.chain(names).split(' ').first().split('-to-')
    .value();

  return {
    fromName: from,
    toName: to,
    values: values.map((value) => {
      const [toRange, fromRange, range] = value.split(' ').map(Number);
      return { from: fromRange, to: toRange, range };
    }),
  };
});

const convertSeedPart1 = (values, seed) => {
  const value = values.find((val) => seed >= val.from && seed <= val.from + val.range);
  return value ? seed + value.to - value.from : seed;
};

const proceedSeedPart1 = (initialSeed) => {
  let seed = initialSeed;
  let category = 'seed';

  while (category !== 'location') {
    const conversion = _.find(conversions, { fromName: category });
    seed = convertSeedPart1(conversion.values, seed);
    category = conversion.toName;
  }
  return seed;
};

console.log(
  'Part 1 soluce is',
  _.chain(seeds)
    .split('seeds: ')
    .get(1)
    .split(' ')
    .map(Number)
    .map(proceedSeedPart1)
    .min()
    .value(),
);

const convertSeedPart2 = (values, seed) => {
  const value = values.find((val) => seed >= val.to && seed <= val.to + val.range);
  return value ? seed + value.from - value.to : seed;
};

const proceedSeedPart2 = (initialSeed) => {
  let seed = initialSeed;
  let category = 'location';

  while (category !== 'seed') {
    const conversion = _.find(conversions, { toName: category });
    seed = convertSeedPart2(conversion.values, seed, initialSeed);
    category = conversion.fromName;
  }
  return seed;
};

const parsedSeed = _.chain(seeds)
  .split('seeds: ')
  .get(1)
  .split(' ')
  .map(Number)
  .reduce((acc, seed, index, arr) => (
    (index % 2 === 1) ? acc : [...acc, { from: seed, length: arr[index + 1] }]), [])
  .value();

let i = 0;
while (true) {
  const seed = proceedSeedPart2(i);
  if (parsedSeed.some((val) => seed >= val.from && seed <= val.from + val.length - 1)) {
    break;
  }
  i += 1;
}

console.log(
  'Part 2 soluce is',
  i - 1,
);
