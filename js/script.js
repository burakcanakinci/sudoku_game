// screens
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const pauseScreen = document.querySelector('#pause-screen');
// initial value
const nameInput = document.querySelector('#input__name');
const cells = document.querySelectorAll('.main__grid-cell');
const playerName = document.querySelector('#player-name') ;
const gameLevel = document.querySelector('#game-level');
const gameTime = document.querySelector('#game-time');
const pauseButton = document.querySelector('#btn__pause');
const resumeButton = document.querySelector('#btn__resume');
const newGameButton = document.querySelector('#btn__new-game');

let levelIndex = 0;
let level = CONSTANT.LEVEL[levelIndex];
let timer = null;
let pause = false;
let seconds = 0;
// --------------


const getGameInfo = () => JSON.parse(localStorage.getItem('game'));

//add space for each 9 cells
const initGameGrid = () => {
  let index = 0;
  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    let row = Math.floor(i/CONSTANT.GRID_SIZE);
    let col = i % CONSTANT.GRID_SIZE;
    if (row === 2 || row === 5) cells[index].style.borderBottom = 'solid 1px black';
    if (col === 2 || col === 5) cells[index].style.borderRight = 'solid 1px black';
    index++;
  }
}
// ---------------
const setPlayerName = (name) => localStorage.setItem('playerName', name);
const getPlayerName = () => localStorage.getItem('playerName');
const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const startGame = () => {
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');

  playerName.innerHTML = nameInput.value;
  setPlayerName(nameInput.value.trim());

  gameLevel.innerHTML = CONSTANT.LEVEL_NAME[levelIndex];
  seconds = 0;

  timer = setInterval(() => {
    if (!pause) {
      seconds = seconds + 1;
      gameTime.innerHTML = showTime(seconds);
    }
  }, 1000);
}

const returnStartScreen = () => {
  clearInterval(timer);
  pause = false;
  seconds = 0;
  startScreen.classList.add('active');
  gameScreen.classList.remove('active');
  pauseScreen.classList.remove('active');
  pauseButton.classList.remove('active');
}

// add button event
document.querySelector('#btn__level').addEventListener('click', (e) => {
  levelIndex = levelIndex + 1 > CONSTANT.LEVEL.length - 1 ? 0 : levelIndex + 1;
  level = CONSTANT.LEVEL[levelIndex];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[levelIndex];
});

document.querySelector('#btn__play').addEventListener('click', () => {
  if (nameInput.value.trim().length > 0) {
    startGame();
  } else {
    nameInput.classList.add('input--err');
    setTimeout(() => {
      nameInput.classList.remove('input--err');
      nameInput.focus();
    }, 250);
  }
});

pauseButton.addEventListener('click', () => {
  pauseScreen.classList.add('active');
  pauseButton.classList.add('active');
  pause = true;
});
resumeButton.addEventListener('click', () => {
  pauseScreen.classList.remove('active');
  pauseButton.classList.remove('active');
  pause = false;
});
newGameButton.addEventListener('click', () => {
  returnStartScreen();
});
// ----------------

const init = () => {
  const game = getGameInfo();
  document.querySelector('#btn__continue').style.display = game ? 'grid':'none';
  initGameGrid();

  if (getPlayerName()) {
    nameInput.value = getPlayerName();
  } else {
    nameInput.focus();
  }
}

init();
