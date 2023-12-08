const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const getBestConfig = (cards) => {
  const config = cards.split('').reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {});

  if (Object.values(config).some((v) => v === 5)) { return 6; }
  if (Object.values(config).some((v) => v === 4)) { return 5; }
  if (Object.values(config).some((v) => v === 3) && Object.values(config).some((v) => v === 2)) {
    return 4;
  }
  if (Object.values(config).some((v) => v === 3)) { return 3; }
  if (Object.values(config).reduce((acc, value) => (acc + (value === 2 ? 1 : 0)), 0) === 2) {
    return 2;
  }
  if (Object.values(config).some((v) => v === 2)) {
    return 1;
  }
  return 0;
};

const compareCards = (config1, config2, cards1, cards2) => {
  const diffCardIndex = _.range(0, cards1.length).find((i) => cards1[i] !== cards2[i]);
  const bestCard1 = values.findIndex((v) => v === cards1[diffCardIndex]);
  const bestCard2 = values.findIndex((v) => v === cards2[diffCardIndex]);

  return config1 === config2
    ? bestCard1 > bestCard2
    : config1 > config2;
};

console.log(
  'Part 1 soluce is',
  _.chain(input)
    .split('\n')
    .map((line) => line.split(' '))
    .map(([cards, bid]) => [cards, getBestConfig(cards), bid])
    .map(([cards, config, bid], i, arr) => [
      arr
        .reduce(
          (acc, [cards2, config2], index) => (index === i
            ? acc
            : acc + compareCards(config, config2, cards, cards2)),
          0,
        ),
      Number(bid), cards])
    .sortBy(([score]) => score)
    .reduce((acc, [, bid], i) => acc + bid * (i + 1), 0)
    .value(),
);

const startTime = process.hrtime();

const part2Values = ['J', ...values.filter((v) => v !== 'J')];

const compareCards2 = (config1, config2, cards1, cards2) => {
  const diffCardIndex = _.range(0, cards1.length).find((i) => cards1[i] !== cards2[i]);
  const bestCard1 = part2Values.findIndex((v) => v === cards1[diffCardIndex]);
  const bestCard2 = part2Values.findIndex((v) => v === cards2[diffCardIndex]);

  return config1 === config2
    ? bestCard1 > bestCard2
    : config1 > config2;
};

const getBestConfig2 = (cards) => {
  const config = cards.split('').reduce((acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }), {});

  const jokerCount = config.J || 0;

  delete config.J;

  if (jokerCount === 5 || Object.values(config).some((v) => v + jokerCount === 5)) { return 6; }
  if (Object.values(config).some((v) => v + jokerCount === 4)) { return 5; }
  if (Object.values(config).some((v) => v === 3) && Object.values(config).some((v) => v === 2)) {
    return 4;
  }
  if (Object.values(config).reduce((acc, value) => (acc + (value === 2 ? 1 : 0)), 0) === 2) {
    return jokerCount > 0 ? 4 : 2;
  }
  if (Object.values(config).some((v) => v + jokerCount === 3)) { return 3; }
  if (Object.values(config).some((v) => v + jokerCount === 2)) {
    return 1;
  }
  return 0;
};

console.log(
  'Part 2 soluce is',
  JSON.stringify(_.chain(input)
    .split('\n')
    .map((line) => line.split(' '))
    .map(([cards, bid]) => [cards, getBestConfig2(cards), bid])
    .map(([cards, config, bid], i, arr) => [
      arr
        .reduce(
          (acc, [cards2, config2], index) => (index === i
            ? acc
            : acc + compareCards2(config, config2, cards, cards2)),
          0,
        ),
      Number(bid), cards])
    .sortBy(([score]) => score)
    .reduce(
      (acc, [, bid], i) => acc + bid * (i + 1),
      0,
    )
    .value()),
);

const endTime = process.hrtime(startTime);
console.log(endTime[0] * 1000 + endTime[1] / 1e6);
