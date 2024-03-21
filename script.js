const gameBoard = (function () {
  const winningTiles = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
})();

const player = function () {
  let score = 0;

  let moves = [];

  const getScore = () => score;
  const increaseScore = () => score++;
  const getMoves = () => moves;
  const addMoves = (move) => moves.push(move);

  return { getScore, increaseScore, getMoves, addMoves };
};

const playerOne = player();
const playerTwo = player();

playerTwo.increaseScore();
playerTwo.addMoves(7);

playerOne.increaseScore();
playerOne.increaseScore();
playerOne.addMoves(3);
playerOne.addMoves(4);
playerOne.addMoves(1);
playerOne.addMoves(0);
playerOne.addMoves(5);

console.log(playerOne.getScore());
console.log(playerOne.getMoves());

console.log(playerTwo.getScore());
console.log(playerTwo.getMoves());
