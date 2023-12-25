const header = document.querySelector("header");
const overlayEl = document.querySelector(".overlay");
const playerForm = document.querySelector(".player__form");
const playButtonsEl = document.querySelector("#btn--play__wrapper");
const btnQuitEl = document.querySelector("#btn--quit");
const btnNextRoundEl = document.querySelector("#btn--nextRound");
const gameContainerEl = document.querySelector(".game__container");
const gameArenaEl = document.querySelector(".game__arena");
const playerTurnEl = document.querySelector(".player__turn");
let currentPlayer = "x";
const winnerMessageEl = document.querySelector("#winner--message");
const winningMarkWrapperEl = document.querySelector(".winning--mark__wrapper");
const roundTakerContentEl = document.querySelector("#round--taker__content");
const playerOptions = [...document.querySelectorAll("input[type='radio']")];
const gameBlocksEl = document.querySelectorAll(".game--block");
let winner;
const scoreBoardEl = document.querySelectorAll(".score--block > strong");
const btnReplayEl = document.querySelector("#btn--replay");
let clickedButtonCounter = 0;
let winningMark = "";
let tieScore = 0;
const boardTieEl = document.querySelector("#board-tie");

const player1 = {
  name: "",
  number: "1",
  mark: "",
  score: 0,
};

const player2 = {
  name: "",
  number: "2",
  mark: "",
  score: 0,
};

const players = [player1, player2];

const gameMaps = {
  row0: [],
  col0: [],
  row1: [],
  col1: [],
  row2: [],
  col2: [],
  slash: [],
  backslash: [],
};

// Functions
const displayGame = function () {
  header.classList.add("active");
  playerForm.classList.remove("active");
  gameContainerEl.classList.add("active");
};

const playerSelection = function (player) {
  if (player) {
    player1.name = "p1";
    player2.name = "p2";
  } else {
    player1.name = "you";
    player2.name = "cpu";
  }
  player1.mark = playerOptions.find(option => option.checked).value;
  player2.mark = playerOptions.find(option => !option.checked).value;
  const p1Board = document.querySelector(`#board-${player1.mark}`);
  const challengerBoard = document.querySelector(`#board-${player2.mark}`);
  p1Board.textContent = `${player1.mark} (${player1.name})`;
  challengerBoard.textContent = `${player2.mark} (${player2.name})`;
};

const winningDisplay = function () {
  winningMark = document.createElement("img");
  winningMark.setAttribute("src", `./assets/icon-${winner.mark}.svg`);
  winningMark.setAttribute("alt", "winning mark");

  winningMarkWrapperEl.prepend(winningMark);
  winner.score += 1;
  document.querySelector(
    `#board-${winner.mark} + strong`
  ).textContent = `${winner.score}`;
  overlayEl.classList.add("active");
  winnerMessageEl.textContent = `player ${winner.number} wins!`;
};

const tieDisplay = function () {
  overlayEl.classList.add("active");
  roundTakerContentEl.textContent = "";
  winnerMessageEl.textContent = "round tied!";
  tieScore++;
  boardTieEl.textContent = tieScore;
};

const gameCheck = function () {
  for (const key in gameMaps) {
    if (gameMaps[key].length === 3 && new Set(gameMaps[key]).size === 1) {
      winner = players.find(
        player => player.mark === [...new Set(gameMaps[key])][0]
      );
      winningDisplay();
    }
  }
  if (clickedButtonCounter === 9 && !winner) tieDisplay();
};

const inputOrganize = function (element) {
  const symbol = element.querySelector("img").alt;
  gameMaps[element.dataset.row].push(symbol);
  gameMaps[element.dataset.column].push(symbol);
  gameMaps[element.dataset.slash] &&
    gameMaps[element.dataset.slash].push(symbol);
  gameMaps[element.dataset.backslash] &&
    gameMaps[element.dataset.backslash].push(symbol);
};

const changeTurn = function () {
  gameArenaEl.classList.toggle("o");
  currentPlayer = gameArenaEl.classList[gameArenaEl.classList.length - 1];
  playerTurnEl.style.backgroundImage = `url("./assets/icon-${currentPlayer}.svg")`;
};

const placeMark = function (element) {
  const mark = `<img src="./assets/icon-${currentPlayer}.svg" alt="${currentPlayer}">`;
  element.insertAdjacentHTML("beforeend", mark);

  element.disabled = true;

  clickedButtonCounter++;

  inputOrganize(element);
  gameCheck();
};

const resetGame = function () {
  winner = "";

  for (const el in gameMaps) {
    gameMaps[el] = [];
  }

  for (const block of gameBlocksEl) {
    const mark = block.children[0];
    mark && block.removeChild(mark);
    block.disabled = false;
  }

  currentPlayer = "x";
  playerTurnEl.style.backgroundImage = `url("./assets/icon-${currentPlayer}.svg")`;
  gameArenaEl.classList.contains("o") && gameArenaEl.classList.remove("o");

  clickedButtonCounter = 0;

  winningMark && winningMarkWrapperEl.removeChild(winningMark);
  winningMark = "";

  roundTakerContentEl.textContent = "takes the round!";
};

const quitGame = function () {
  header.classList.remove("active");
  playerForm.classList.add("active");
  gameContainerEl.classList.remove("active");
  overlayEl.classList.remove("active");

  for (const board of scoreBoardEl) {
    board.textContent = "0";
  }

  players.forEach(player => {
    player.name = "";
    player.score = 0;
    player.mark = "";
  });

  tieScore = 0;
  boardTieEl.textContent = 0;

  resetGame();
};

const nextRound = function () {
  overlayEl.classList.remove("active");
  resetGame();
};

// Button Event Listener

playButtonsEl.addEventListener("click", function (e) {
  const element = e.target;

  displayGame();

  if (element.classList.contains("btn") && element.id === "cpu") {
    playerSelection();
  }

  if (element.classList.contains("btn") && element.id === "other--player") {
    playerSelection(true);
  }
});

gameArenaEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    placeMark(e.target);
    changeTurn();
  }
});

btnQuitEl.addEventListener("click", quitGame);

btnReplayEl.addEventListener("click", resetGame);

btnNextRoundEl.addEventListener("click", nextRound);
