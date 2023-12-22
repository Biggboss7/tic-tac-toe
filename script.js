const header = document.querySelector("header");
const playerForm = document.querySelector(".player__form");
const playButtonsEl = document.querySelector("#btn--play__wrapper");
const gameContainerEl = document.querySelector(".game__container");
const displayGame = function () {
  header.classList.add("active");
  playerForm.classList.remove("active");
  gameContainerEl.classList.add("active");
};

playButtonsEl.addEventListener("click", function (e) {
  const element = e.target;

  displayGame();

  if (element.classList.contains("btn") && element.id === "cpu") {
  }

  if (element.classList.contains("btn") && element.id === "other--player") {
  }
});
