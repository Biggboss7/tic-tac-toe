const header = document.querySelector("header");
const playerForm = document.querySelector(".player__form");
const playButtonsEl = document.querySelector("#btn--play__wrapper");
const gameContainerEl = document.querySelector(".game__container");
const gameArenaEl = document.querySelector(".game__arena");
const playerTurnEl = document.querySelector(".player__turn");
let currentPlayer;
const displayGame = function () {
  header.classList.add("active");
  playerForm.classList.remove("active");
  gameContainerEl.classList.add("active");
};

const changeTurn = function () {
  gameArenaEl.classList.toggle("o");
  currentPlayer = gameArenaEl.classList[gameArenaEl.classList.length - 1];
  playerTurnEl.style.backgroundImage = `url("./assets/icon-${currentPlayer}.svg")`;
};

playButtonsEl.addEventListener("click", function (e) {
  const element = e.target;

  displayGame();

  if (element.classList.contains("btn") && element.id === "cpu") {
  }

  if (element.classList.contains("btn") && element.id === "other--player") {
  }
});

gameArenaEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    changeTurn();
  }
});
