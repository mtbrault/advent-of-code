const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const inputByChar = input.split('');

const getMoreCommonSetence = (list) => {
  const valueByIndex = [];

  let i = 0;
  list.forEach((char) => {
    if (char === '\n') {
      i = 0;
      return;
    }
    if (!valueByIndex[i]) valueByIndex[i] = [];
    valueByIndex[i].push(char);
    i += 1;
  });
  return valueByIndex;
};

const getFinalNumber = (list) => list.map((value) => {
  const res = _.countBy(value);
  return res[1] >= res[0] ? '1' : '0';
}).join('');

const invertFinalNumber = (list) => list.map((value) => {
  const res = _.countBy(value);
  return res[1] > res[0] ? '0' : '1';
}).join('');

const finalNumber = getFinalNumber(getMoreCommonSetence(inputByChar));

const invertedFinalNumber = invertFinalNumber(getMoreCommonSetence(inputByChar));

console.log(
  'Part 1 soluce is ',
  parseInt(finalNumber, 2) * parseInt(invertedFinalNumber, 2),
);

//  ------------------- PART2 --------------------------

const getMostCommon = (list, index) => {
  const count0 = list.reduce((acc, value) => (acc + (value[index] === '0' ? 1 : 0)), 0);
  const count1 = list.length - count0;
  return count0 > count1 ? '0' : '1';
};

const getLeastCommon = (list, index) => {
  const count0 = list.reduce((acc, value) => (acc + (value[index] === '0' ? 1 : 0)), 0);
  const count1 = list.length - count0;
  return count0 <= count1 ? '0' : '1';
};

let oxygenRating = input.split('\n');
let scrubberRating = input.split('\n');
for (let index = 0; index < finalNumber.length; index += 1) {
  const oxygenChar = getMostCommon(oxygenRating, index);
  const scrubberChar = getLeastCommon(scrubberRating, index);
  if (oxygenRating.length > 1) {
    oxygenRating = oxygenRating.filter((number) => number[index] === oxygenChar);
  }
  if (scrubberRating.length > 1) {
    scrubberRating = scrubberRating
      .filter((number) => number[index] === scrubberChar);
  }
}

console.log(
  'Part 2 soluce is ',
  parseInt(Number(oxygenRating[0]), 2) * parseInt(Number(scrubberRating[0]), 2),
);
