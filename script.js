const newGameBtn = document.querySelector(".btn-new-game");
const rollDiceBtn = document.querySelector(".btn-roll-dice");
const holdBtn = document.querySelector(".btn-hold");

const totalScore1 = document.querySelector(".total-score-1");
const totalScore2 = document.querySelector(".total-score-2");
const score1 = document.querySelector(".score-1");
const score2 = document.querySelector(".score-2");

const dice = document.querySelector(".dice");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");

const winningScore = 100;
let diceRoll, playing, currentPlayer, scores, totalScores;

const initialize = function () {
  playing = true;
  currentPlayer = 0;
  scores = [0, 0];
  totalScores = [0, 0];

  player1.classList.add("player-active");
  player2.classList.remove("player-active");
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  dice.classList.remove("hidden");

  score1.textContent = scores[0];
  score2.textContent = scores[1];
  totalScore1.textContent = totalScores[0];
  totalScore2.textContent = totalScores[1];
};

const switchPlayer = function () {
  if (playing) {
    scores[currentPlayer] = 0;
    document.querySelector(`.score-${currentPlayer + 1}`).textContent =
      scores[currentPlayer];
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player1.classList.toggle("player-active");
    player2.classList.toggle("player-active");
  }
};

const rollDice = function () {
  if (playing) {
    diceRoll = Math.ceil(Math.random() * 6);
    dice.src = `img/dice-${diceRoll}.png`;

    if (diceRoll > 1) {
      scores[currentPlayer] += diceRoll;
      document.querySelector(`.score-${currentPlayer + 1}`).textContent =
        scores[currentPlayer];
    } else {
      switchPlayer();
    }
  }
};

const holdScore = function () {
  totalScores[currentPlayer] += scores[currentPlayer];
  document.querySelector(`.total-score-${currentPlayer + 1}`).textContent =
    totalScores[currentPlayer];

  if (totalScores[currentPlayer] >= winningScore) {
    playing = false;
    document
      .querySelector(`.player-${currentPlayer + 1}`)
      .classList.add("winner");
    dice.classList.add("hidden");
  } else {
    switchPlayer();
  }
};

initialize();

rollDiceBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", initialize);
