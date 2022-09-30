'use strict';
//selecting our element
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
//you can do this too
//const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, scores, currentScore, activePlayer;
//starting
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.disolay the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //3.check if dice is 1 or not , if it was one you should switch to the next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to the active player score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check the score is <=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
