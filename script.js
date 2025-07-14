const board = document.getElementById('board');
const cells = board.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winner');
const newGameBtn = document.getElementById('newGame');
const resetBtn = document.getElementById('resetButton');

let currentPlayer = 'X';
let isGameActive = true;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
    cell.addEventListener('click', handleClick, { once: true });
  });
  isGameActive = true;
  currentPlayer = 'X';
  winnerMessage.classList.add('hide');
  newGameBtn.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  if (!isGameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function endGame(draw) {
  isGameActive = false;
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `Congratulations, Winner is ${currentPlayer}`;
  }
  winnerMessage.classList.remove('hide');
  newGameBtn.classList.remove('hide');
}

newGameBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', startGame);

startGame();
