const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const constructMapByX = (map) => map.split('\n');

const constructMapByY = (map) => {
  const res = [];
  const m = map.split('\n').map((line) => line.split(''));

  for (let y = 0; y < m[0].length; y += 1) {
    let col = '';
    for (let x = 0; x < m.length; x += 1) {
      col += m[x][y];
    }
    res.push(col);
  }
  return res;
};

const getNbDiff = (first, second) => {
  let count = 0;
  for (let i = 0; i < first.length; i += 1) {
    const f = first[i].split('');
    const s = second[i].split('');
    count += f.reduce((acc, value, idx) => acc + (value !== s[idx] ? 1 : 0), 0);
  }
  return count;
};

const findReflection = (map, oneDiff) => {
  for (let i = 1; i < map.length; i += 1) {
    const before = _.slice(map, 0, i);
    const after = _.slice(map, i, map.length);
    if (!oneDiff && _
      .isEqual(_.slice(before, after.length * -1).reverse(), _.slice(after, 0, before.length))) {
      return i;
    } if (oneDiff && getNbDiff(
      _.slice(before, after.length * -1).reverse(),
      _.slice(after, 0, before.length),
    ) === 1) {
      return i;
    }
  }
  return null;
};

console.log(
  'Part 1 soluce is',
  _.chain(input)
    .split('\n\n')
    .map((map) => {
      const mapByX = constructMapByX(map);
      const mapByY = constructMapByY(map);
      const reflectionX = findReflection(mapByX);
      if (reflectionX) {
        return 100 * reflectionX;
      }
      const reflectionY = findReflection(mapByY);
      return reflectionY;
    })
    .sum()
    .value(),
);

console.log(
  'Part 2 soluce is',
  _.chain(input)
    .split('\n\n')
    .map((map) => {
      const mapByX = constructMapByX(map);
      const reflectionX = findReflection(mapByX, true);
      if (reflectionX) { return 100 * reflectionX; }
      const mapByY = constructMapByY(map);
      const reflectionY = findReflection(mapByY, true);
      return reflectionY;
    })
    .sum()
    .value(),
);
