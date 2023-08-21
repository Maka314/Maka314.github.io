'use strict';

const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const dicePic = document.querySelector('.dice');
let currentScore = 0;
let currentPlayer = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

const scoreAdder = function (player, score, thisScore) {
  const scoreElement = document.querySelector(`#current--${player}`);
  score = score + thisScore;
  scoreElement.textContent = score;
  return score;
};

const scoreCleaner = function (player) {
  const scoreElement = document.querySelector(`#current--${player}`);
  scoreElement.textContent = 0;
  return 0;
};

const hold = function () {
  if (currentPlayer === 0) {
    playerOneScore += currentScore
    document.querySelector('#score--0').textContent = playerOneScore

  } else {
    playerTwoScore += currentScore
    document.querySelector('#score--1').textContent = playerTwoScore
  }
  currentScore = scoreCleaner(currentPlayer);
  currentPlayer = playerSwitch(currentPlayer);
}

const playerSwitch = function (player) {
  if (player === 0) {
    document.querySelector(`#current--0`).textContent = 0;
    document.getElementsByClassName('player--0')[0].classList.remove('player--active')
    document.getElementsByClassName('player--1')[0].classList.add('player--active')
    return 1;
  } else {
    document.querySelector(`#current--1`).textContent = 0;
    document.getElementsByClassName('player--0')[0].classList.add('player--active')
    document.getElementsByClassName('player--1')[0].classList.remove('player--active')
    return 0;
  }
};

const rollDice = function () {
  const res = Math.trunc(Math.random() * 6 + 1);
  console.log(`current dice res = ${res}`);
  dicePic.src = `dice-${res}.png`;
  if (res === 1) {
    // remove score and switch
    currentScore = scoreCleaner(currentPlayer);
    currentPlayer = playerSwitch(currentPlayer);
  } else {
    // add score
    currentScore = scoreAdder(currentPlayer, currentScore, res);
  }
};

rollDiceButton.addEventListener('click', rollDice);
holdButton.addEventListener('click',hold)