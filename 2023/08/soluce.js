const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const [instructions, list] = input.split('\n\n');

const map = {};
list.split('\n').forEach((line) => {
  const [k, value] = line.split(' = ');
  const [left, right] = value.replace('(', '').replace(')', '').split(', ');
  map[k] = { left, right };
});

let key = 'AAA';
let i = 0;
while (key !== 'ZZZ') {
  const { left, right } = map[key];
  if (instructions[i % instructions.length] === 'L') {
    key = left;
  } else if (instructions[i % instructions.length] === 'R') {
    key = right;
  }
  i += 1;
}

console.log(
  'Part 1 soluce is',
  i,
);

const findPrimeFactor = (number) => {
  const factors = [];
  let divisor = 2;
  let nb = number;

  while (nb > 1) {
    while (nb % divisor === 0) {
      factors.push(divisor);
      nb /= divisor;
    }
    divisor += 1;
  }
  return factors;
};

console.log(
  'Part 2 soluce is',
  _.chain(map)
    .keys()
    .filter((k) => k[k.length - 1] === 'A')
    .map((entry) => {
      let k = entry;
      let s = 0;
      while (k[k.length - 1] !== 'Z') {
        const { left, right } = map[k];
        if (instructions[s % instructions.length] === 'L') {
          k = left;
        } else if (instructions[s % instructions.length] === 'R') {
          k = right;
        }
        s += 1;
      }
      return findPrimeFactor(s);
    })
    .reduce((acc, value) => [...acc, ...value], [])
    .uniq()
    .reduce((acc, value) => acc * value, 1)
    .value(),
);
