const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const lines = input.split('\n');

const operation = (part1 = false) => {
  const map = [];

  const countDoubleOccurence = () => map.reduce(
    (total, line) => total + line.reduce(
      (acc, val) => acc + (val >= 2 ? 1 : 0),
      0,
    ),
    0,
  );

  lines.forEach((line) => {
    const [first, second] = line.split(' -> ');
    const [x1, y1] = first.split(',').map(Number);
    const [x2, y2] = second.split(',').map(Number);
    if (x1 === x2) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i += 1) {
        if (!map[i]) {
          map[i] = [];
        }
        map[i][x1] = (map[i][x1] || 0) + 1;
      }
    } else if (y1 === y2) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i += 1) {
        if (!map[y1]) {
          map[y1] = [];
        }
        map[y1][i] = (map[y1][i] || 0) + 1;
      }
    } else if (!part1) {
      const incrX = x1 < x2 ? 1 : -1;
      const incrY = y1 < y2 ? 1 : -1;
      for (let i = 0; i <= Math.max(y1, y2) - Math.min(y1, y2); i += 1) {
        const x = x1 + (i * incrX);
        const y = y1 + (i * incrY);
        if (!map[y]) {
          map[y] = [];
        }
        map[y][x] = (map[y][x] || 0) + 1;
      }
    }
  });

  return countDoubleOccurence();
};

console.log(
  'Part 1 soluce is ',
  operation(true),
);

console.log(
  'Part 2 soluce is ',
  operation(),
);
