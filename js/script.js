// screens
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const pauseScreen = document.querySelector('#pause-screen');
// initial value
const cells = document.querySelectorAll('.main__grid-cell');
const nameInput = document.querySelector('#input__name');
const numberInputs = document.querySelectorAll('.number');
const playerName = document.querySelector('#player-name');
const gameLevel = document.querySelector('#game-level');
const gameTime = document.querySelector('#game-time');
const pauseButton = document.querySelector('#btn__pause');
const resumeButton = document.querySelector('#btn__resume');
const newGameButton = document.querySelector('#btn__new-game');
const deleteButton = document.querySelector('#btn__delete');
const playButton = document.querySelector('#btn__play');
const levelButton = document.querySelector('#btn__level');
const continueButton = document.querySelector('#btn__continue');
let levelIndex = 0;
let level = CONSTANT.LEVEL[levelIndex];
let timer = null;
let pause = false;
let seconds = 0;
let su = undefined;
let suAnswer = undefined;
let selectedCell = -1;
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
const clearSudoku = () => {
  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('filled');
    cells[i].classList.remove('selected');
  }
}
const initSudoku = () => {
  // clear old sudoku
  clearSudoku();
  resetBg();
  // generate sudoku puzzle here
  su = sudokuGen(level);
  suAnswer = [...su.question];
  seconds = 0;
  saveGameInfo();
  //show sudoku to table
  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    let row = Math.floor(i / CONSTANT.GRID_SIZE);
    let col = i % CONSTANT.GRID_SIZE;
    cells[i].setAttribute('data-value', su.question[row][col]);
    if (su.question[row][col] !== 0) {
      cells[i].classList.add('filled');
      cells[i].innerHTML = su.question[row][col];
    }
  }
}
const loadSudoku = () => {
  let game = getGameInfo();
  gameLevel.innerHTML = CONSTANT.LEVEL_NAME[game.level];
  su = game.su;
  suAnswer = su.answer;
  seconds = game.seconds;
  gameTime.innerHTML = showTime(seconds);
  levelIndex = game.level;
  // show sudoku to table
  for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
    let row = Math.floor(i / CONSTANT.GRID_SIZE);
    let col = i % CONSTANT.GRID_SIZE;
    cells[i].setAttribute('data-value', suAnswer[row][col]);
    cells[i].innerHTML = suAnswer[row][col] !== 0 ? suAnswer[row][col] : '';
    if (su.question[row][col] !== 0) {
      cells[i].classList.add('filled');
    }
  }
}
const startGame = () => {
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');

  playerName.innerHTML = nameInput.value;
  setPlayerName(nameInput.value.trim());

  gameLevel.innerHTML = CONSTANT.LEVEL_NAME[levelIndex];
  seconds = 0;
  showTime(seconds);

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
const hoverBg = (index) => {
  let row = Math.floor(index / CONSTANT.GRID_SIZE);
  let col = index % CONSTANT.GRID_SIZE;
  let boxStartRow = row - row % 3;
  let boxStartCol = col - col % 3;
  for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
    for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
      let cell = cells[9 * (boxStartRow + i) + (boxStartCol + j)];
      cell.classList.add('hover');
    }  
  }
  let step = 9;
  while (index - step >= 0) {
    cells[index - step].classList.add('hover');
    step += 9;
  }
  step = 9;
  while (index + step < 81) {
    cells[index + step].classList.add('hover');
    step += 9;
  }
  step = 1;
  while (index - step >= 9*row) {
    cells[index - step].classList.add('hover');
    step += 1;
  }
  step = 1;
  while (index + step < 9*row + 9) {
    cells[index + step].classList.add('hover');
    step += 1;
  }
}
const resetBg = () => {
  cells.forEach(e => e.classList.remove('hover'));
}
const checkError = (value) => {
  const addError = (cell) => {
    if (parseInt(cell.getAttribute('data-value')) === value) {
      cell.classList.add('error');
      // cell.classList.add('cell-error');
      // setTimeout(() => {
      //   cell.classList.remove('cell-error');
      // }, 500);
    }
  }
  let index = selectedCell;
  let row = Math.floor(index / CONSTANT.GRID_SIZE);
  let col = index % CONSTANT.GRID_SIZE;
  let boxStartRow = row - row % 3;
  let boxStartCol = col - col % 3;
  for (let i = 0; i < CONSTANT.BOX_SIZE; i++) {
    for (let j = 0; j < CONSTANT.BOX_SIZE; j++) {
      let cell = cells[9 * (boxStartRow + i) + (boxStartCol + j)];
      if (!cell.classList.contains('selected')) addError(cell);
    }  
  }
  let step = 9;
  while (index - step >= 0) {
    addError(cells[index - step]);
    step += 9;
  }
  step = 9;
  while (index + step < 81) {
    addError(cells[index + step]);
    step += 9;
  }
  step = 1;
  while (index - step >= 9 * row) {
    addError(cells[index - step]);
    step += 1;
  }
  step = 1;
  while (index + step < 9 * row + 9) {
    addError(cells[index + step]);
    step += 1;
  }
}
const removeError = () => cells.forEach(e => e.classList.remove('error'));
const saveGameInfo = () => {
  let game = {
    level: levelIndex,
    seconds: seconds,
    su: {
      original: su.original,
      question: su.question,
      answer: suAnswer
    }
  }
  localStorage.setItem('game', JSON.stringify(game));
}
const removeGameInfo = () => {
  localStorage.removeItem('game');
  continueButton.style.display = 'none';
}
const isGameWin = () => sudokuCheck(suAnswer);
const showResult = () => {
  clearInterval(timer);
  alert('win');
  // show result screen
  
}
const initNumberInputEvent = () => {
  numberInputs.forEach((e, index) => {
    e.addEventListener('click', () => {
      if (!cells[selectedCell].classList.contains('filled')) {
        cells[selectedCell].innerHTML = index + 1;
        cells[selectedCell].setAttribute('data-value', index + 1);
        // add to answer
        let row = Math.floor(selectedCell / CONSTANT.GRID_SIZE);
        let col = selectedCell % CONSTANT.GRID_SIZE;
        suAnswer[row][col] = index + 1;
        // save game
        saveGameInfo();
        // ---------
        removeError();
        checkError(index + 1);
        // cells[selectedCell].classList.add('zoom-in');
        // setTimeout(() => {
        //   cells[selectedCell].classList.remove('zoom-in');
        // }, 500);
        // check game win
        if (isGameWin()) {
          removeGameInfo();
          showResult();
        }
        // --------------
      }
    })
  })
}
const initCellsEvent = () => {
  cells.forEach((e, index) => {
    e.addEventListener('click', () => {
      if (!e.classList.contains('filled')) {
        cells.forEach(e => e.classList.remove('selected'));
        selectedCell = index;
        e.classList.remove('error');
        e.classList.add('selected');
        resetBg();
        hoverBg(index);
      }
    })
  })
}
// add button event
levelButton.addEventListener('click', (e) => {
  levelIndex = levelIndex + 1 > CONSTANT.LEVEL.length - 1 ? 0 : levelIndex + 1;
  level = CONSTANT.LEVEL[levelIndex];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[levelIndex];
});
playButton.addEventListener('click', () => {
  if (nameInput.value.trim().length > 0) {
    initSudoku();
    startGame();
  } else {
    nameInput.classList.add('input--error');
    setTimeout(() => {
      nameInput.classList.remove('input--error');
      nameInput.focus();
    }, 250);
  }
});
continueButton.addEventListener('click', () => {
  if (nameInput.value.trim().length > 0) {
    loadSudoku();
    startGame();
  } else {
    nameInput.classList.add('input--error');
    setTimeout(() => {
      nameInput.classList.remove('input--error');
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
deleteButton.addEventListener('click', () => {
  cells[selectedCell].innerHTML = '';
  cells[selectedCell].setAttribute('data-value', 0);
  let row = Math.floor(selectedCell / CONSTANT.GRID_SIZE);
  let col = selectedCell % CONSTANT.GRID_SIZE;
  suAnswer[row][col] = 0;
  removeError();
});
// ----------------
const init = () => {
  const game = getGameInfo();
  continueButton.style.display = game ? 'grid':'none';
  initGameGrid();
  initCellsEvent();
  initNumberInputEvent();
  if (getPlayerName()) {
    nameInput.value = getPlayerName();
  } else {
    nameInput.focus();
  }
}
init();