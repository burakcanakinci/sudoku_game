// initial value
const inputName = document.querySelector('#input__name')
const screenStart = document.querySelector('#screen__start')

let levelIndex = 0;
let level = CONSTANT.LEVEL[levelIndex]
const cells = document.querySelectorAll('.main__grid-cell')
// --------------

document.querySelector('#btn__level').addEventListener('click', (e) => {
  levelIndex = levelIndex + 1 > CONSTANT.LEVEL.length - 1 ? 0 : levelIndex + 1;
  level = CONSTANT.LEVEL[levelIndex];
  e.target.innerHTML = CONSTANT.LEVEL_NAME[levelIndex];
});

document.querySelector('#btn__play').addEventListener('click', () => {
  if (inputName.value.trim().length > 0) {
    alert(`level => ${level}`);
  } else {
    inputName.classList.add('input--err');
    setTimeout(() => {
      inputName.classList.remove('input--err');
      inputName.focus();
    }, 250);
  }
});

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
// --------------------------

const init = () => {
  const game = getGameInfo();
  document.querySelector('#btn__continue').style.display = game ? 'grid':'none';
  initGameGrid();
}

init();
