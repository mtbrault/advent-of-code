const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const pointsByResult = {
  WIN: 6,
  DRAW: 3,
  LOOSE: 1,
};

const pointsSettings = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

console.log(input.split('\n').reduce((sum, round) => {
  const [opponentInput, myInput] = round.split(' ');
  const inputDiff = pointsSettings[opponentInput] - pointsSettings[myInput];

  const pointsForChoice = pointsSettings[myInput];
  let battlePoints;

  switch (inputDiff) {
    case 0:
      battlePoints = pointsByResult.DRAW;
      break;
    case 1:
    case -2:
      battlePoints = pointsByResult.LOOSE;
      break;
    case 2:
    case -1:
      battlePoints = pointsByResult.WIN;
      break;
    default:
      break;
  }

  return sum + battlePoints + pointsForChoice;
}, 0));
