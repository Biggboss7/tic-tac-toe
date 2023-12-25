const header = document.querySelector("header");
const overlayEl = document.querySelector(".overlay");
const playerForm = document.querySelector(".player__form");
const playButtonsEl = document.querySelector("#btn--play__wrapper");
const gameContainerEl = document.querySelector(".game__container");
const gameArenaEl = document.querySelector(".game__arena");
const playerTurnEl = document.querySelector(".player__turn");
let currentPlayer = "x";
const playerOptions = [...document.querySelectorAll("input[type='radio']")];
let winner;

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
  const winningMark = document.querySelector("img[alt='winning mark']");
  const winnerMessageEl = document.querySelector("#winner--message");
  winner.score += 1;
  document.querySelector(
    `#board-${winner.mark} + strong`
  ).textContent = `${winner.score}`;
  overlayEl.classList.add("active");
  winningMark.src = `./assets/icon-${winner.mark}.svg`;
  winnerMessageEl.textContent = `player ${winner.number} wins!`;
};

const gameCheck = function () {
  Object.entries(gameMaps).forEach(entry => {
    const [_, value] = entry;
    if (value.length === 3 && new Set(value).size === 1) {
      winner = players.find(player => player.mark === [...new Set(value)][0]);
      winningDisplay();
    }
  });
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

  inputOrganize(element);
  gameCheck();
};

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
