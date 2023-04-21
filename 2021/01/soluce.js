const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

console.log(
  'Part 1 soluce is ',
  input.split('\n').map(Number).reduce((sum, value, i, arr) => (sum + (i && arr[i - 1] < value)), 0),
);

console.log(
  'Part 2 soluce is ',
  input
    .split('\n')
    .map(Number)
    .map((value, i, arr) => value + arr[i + 1] + arr[i + 2])
    .reduce((sum, value, i, arr) => (sum + (arr[i - 1] < value)), 0),
);
