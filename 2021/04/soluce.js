const fs = require('fs');
const _ = require('lodash');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8', flag: 'r' });

const boards = input.split('\n\n');
const draws = boards.shift();

const createBoardsMap = () => {
  const boardMap = [];
  boards.forEach((board) => {
    const lines = board.split('\n');
    const boardLines = [];
    lines.forEach((line) => {
      const numbers = line.split(' ').filter((val) => val !== '').map((val) => ({ drawn: false, value: Number(val) }));
      boardLines.push(numbers);
    });
    boardMap.push(boardLines);
  });
  return boardMap;
};

const boardMap = createBoardsMap();

const getWinnerBoard = () => {
  const winnerBoardsIndex = [];
  boardMap.forEach((board, i) => {
    const columns = [0, 0, 0, 0, 0];
    board.forEach((line) => {
      const count = line.reduce((acc, value, index) => {
        columns[index] += value.drawn ? 1 : 0;
        return acc + (value.drawn ? 1 : 0);
      }, 0);
      if (count === 5) {
        winnerBoardsIndex.push(i);
      }
    });
    if (columns.some((val) => val === 5)) {
      winnerBoardsIndex.push(i);
    }
  });
  return _.uniq(winnerBoardsIndex);
};

const markAsDrawn = (numberDrawn) => {
  boardMap.forEach((board) => {
    board.forEach((line) => {
      line.forEach((number) => {
        if (number.value === numberDrawn) {
          // eslint-disable-next-line no-param-reassign
          number.drawn = true;
        }
      });
    });
  });
};

const getSumOfUnmarked = (board) => board
  .reduce(
    (score, line) => score + line
      .reduce(
        (acc, number) => acc + (!number.drawn ? number.value : 0),
        0,
      ),
    0,
  );

let part1Found = false;

for (const draw of draws.split(',')) {
  const numberDrawn = Number(draw);
  markAsDrawn(numberDrawn);
  const winnerBoardIndex = getWinnerBoard();
  if (winnerBoardIndex.length > 0) {
    if (!part1Found) {
      console.log(
        'Part 1 soluce is ',
        getSumOfUnmarked(boardMap[winnerBoardIndex[0]]) * numberDrawn,
      );
      part1Found = true;
    }
    let lastBoard;
    for (let i = 0; i < winnerBoardIndex.length; i += 1) {
      lastBoard = boardMap.splice(winnerBoardIndex[i] - i, 1);
    }
    if (boardMap.length === 0) {
      console.log(
        'Part 2 soluce is ',
        getSumOfUnmarked(lastBoard[0]) * numberDrawn,
      );
    }
  }
}
