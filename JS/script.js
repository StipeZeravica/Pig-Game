//Initialization of all DOM elements used for this project
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const current1 = document.querySelector("#current--0");
const current2 = document.querySelector("#current--1");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");

//set active player variable helper if player===0 player 1 is playing, if player===1 player 2 is playing
let player = 0;

//hide the dice
dice.classList.add("hidden");

//disable buttons: ROLL DICE and HOLD
function disableButtons() {
  rollDice.disabled = true;
  hold.disabled = true;
}

//enable buttons: ROLL DICE and HOLD
function enableButtons() {
  rollDice.disabled = false;
  hold.disabled = false;
}

//determine the winner of the game
function getWinner() {
  if (parseInt(score1.textContent) >= 100) {
    player1.classList.add("player--winner");
    disableButtons();
    return true;
  } else if (parseInt(score2.textContent) >= 100) {
    player2.classList.add("player--winner");
    disableButtons();
    return true;
  }
  return false;
}

//simple change of player helper for function getObj() and function changeActive()
function changeplayer() {
  if (player === 0) {
    player = 1;
  } else {
    player = 0;
  }
}

//returns an object containing DOM elements of active player
function getObj() {
  if (player === 0) {
    return { player: player1, current: current1, score: score1 };
  } else {
    return { player: player2, current: current2, score: score2 };
  }
}

//change active player
function changeActive() {
  let a = getObj();
  a.player.classList.remove("player--active");
  changeplayer();
  a = getObj();
  a.player.classList.add("player--active");
}

//reset the game
function reset() {
  if (parseInt(score1.textContent) >= 100) {
    player1.classList.remove("player--winner");
  } else if (parseInt(score2.textContent) >= 100) {
    player2.classList.remove("player--winner");
  }
  dice.classList.add("hidden");
  score1.textContent = "0";
  score2.textContent = "0";
  current1.textContent = "0";
  current2.textContent = "0";
  player2.classList.remove("player--active");
  player1.classList.add("player--active");
  player = 0;
  enableButtons();
}

//Generate a random number between 0 and 6 for the dice
function randomNumber() {
  return Math.round(Math.random() * (6 - 1) + 1);
}

//Player roll dice
function playerRoll() {
  let number = randomNumber();
  let activePlayer = getObj();
  dice.classList.remove("hidden");
  changeDice(number);
  if (number === 1) {
    activePlayer.current.textContent = `0`;
    changeActive();
  } else {
    activePlayer.current.textContent =
      parseInt(activePlayer.current.textContent) + number;
  }
}

//Player hold
function playerHold() {
  let activePlayer = getObj();
  activePlayer.score.textContent =
    parseInt(activePlayer.score.textContent) +
    parseInt(activePlayer.current.textContent);
  const isWinnerFound = getWinner();
  if (!isWinnerFound) {
    activePlayer.current.textContent = 0;
    changeActive();
  }
}

//After rolling changing the image of the dice
function changeDice(number) {
  switch (number) {
    case 1:
      dice.src = "../IMAGES/dice-1.png";
      break;
    case 2:
      dice.src = "../IMAGES/dice-2.png";
      break;
    case 3:
      dice.src = "../IMAGES/dice-3.png";
      break;
    case 4:
      dice.src = "../IMAGES/dice-4.png";
      break;
    case 5:
      dice.src = "../IMAGES/dice-5.png";
      break;
    case 6:
      dice.src = "../IMAGES/dice-6.png";
      break;
  }
}

//reset the game event
newGame.addEventListener("click", reset);

//ROLL DICE button event
rollDice.addEventListener("click", playerRoll);

//HOLD button event
hold.addEventListener("click", playerHold);
