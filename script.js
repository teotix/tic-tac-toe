const board = document.querySelector(".board");
const tiles = document.querySelectorAll("[class^=tile]");
const winner = document.querySelector("#winner");
const p1Score = document.querySelector("#p1-score");
const p2Score = document.querySelector("#p2-score");
const newGameBtn = document.querySelector("#new-game");
const resetBtn = document.querySelector("#reset-board");
const playerOneName = document.querySelector("#name-1");
const playerTwoName = document.querySelector("#name-2");
const playerOneNameChange = document.querySelector("#new-player-1");
const playerTwoNameChange = document.querySelector("#new-player-2");

let gameFinished = false;

const player = function () {
  let score = 0;
  let moves = [];

  const getScore = () => score;
  const increaseScore = () => score++;
  const getMoves = () => moves;
  const addMoves = (move) => moves.push(move);
  const deleteMoves = () => (moves = []);
  const deleteScore = () => (score = 0);

  return {
    getScore,
    increaseScore,
    getMoves,
    addMoves,
    deleteMoves,
    deleteScore,
  };
};

const playerOne = player();
const playerTwo = player();

const gameBoard = (function () {
  let counter = 0;
  const gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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

  function addToBoard(tile) {
    if (
      tile.textContent === "" &&
      !checkWinner(playerOne) &&
      !checkWinner(playerTwo)
    ) {
      counter++;
      if (counter % 2 == 0) {
        tile.textContent = "O";
        playerTwo.addMoves(+tile.className.slice(-1));
      } else {
        tile.textContent = "X";
        playerOne.addMoves(+tile.className.slice(-1));
      }
    }
    if (checkWinner(playerOne)) {
      gameFinished = true;
      winner.textContent = `${playerOneName.textContent} wins!`;
      playerOne.increaseScore();
      p1Score.textContent = playerOne.getScore();
      counter = 0;
    }
    if (checkWinner(playerTwo)) {
      gameFinished = true;
      winner.textContent = `${playerTwoName.textContent} wins!`;
      playerTwo.increaseScore();
      p2Score.textContent = playerTwo.getScore();
      counter = 0;
    }
    if (
      Array.from(tiles).every((elem) => elem.textContent.trim() !== "") &&
      !checkWinner(playerOne) &&
      !checkWinner(playerTwo)
    ) {
      gameFinished = true;
      winner.textContent = "You have tied the game!";
    }
  }

  function resetBoard() {
    tiles.forEach((elem) => (elem.textContent = ""));
    winner.textContent = "";
    gameFinished = false;
    playerOne.deleteMoves();
    playerTwo.deleteMoves();
  }

  function newGame() {
    playerOneName.textContent = "Player 1";
    playerTwoName.textContent = "Player 2";
    resetBoard();
    p1Score.textContent = "0";
    p2Score.textContent = "0";
    playerOne.deleteScore();
    playerTwo.deleteScore();
  }

  const getBoard = () => gameBoard;
  const getWinningTiles = () => winningTiles;
  const resetCounter = () => (counter = 0);

  return {
    getBoard,
    getWinningTiles,
    addToBoard,
    resetCounter,
    resetBoard,
    newGame,
  };
})();

function checkWinner(player) {
  let winner = false;
  const winningTiles = gameBoard.getWinningTiles();
  const playerMoves = player.getMoves();

  let checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every((elem) => {
      return parentArray.includes(elem);
    });
  };

  winningTiles.forEach((elem) => {
    if (checkSubset(playerMoves, elem)) winner = true;
  });

  return winner;
}

function changeName(e) {
  const name = prompt("Enter new name:");
  console.log(e.target.id);
  +e.target.id.slice(-1) === 1
    ? (playerOneName.textContent = name.slice(0, 11))
    : (playerTwoName.textContent = name.slice(0, 11));
}

playerOneNameChange.addEventListener("click", changeName);
playerTwoNameChange.addEventListener("click", changeName);

resetBtn.addEventListener("click", gameBoard.resetBoard);
board.addEventListener("click", (e) => {
  if (gameFinished !== true) {
    gameBoard.addToBoard(e.target);
  }
});

newGameBtn.addEventListener("click", gameBoard.newGame);
