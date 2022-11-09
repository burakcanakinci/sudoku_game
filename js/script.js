// initial value

const inputName = document.querySelector('#input__name')
const screenStart = document.querySelector('#screen__start')

let levelIndex = 0;
let level = CONSTANT.LEVEL[levelIndex]

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

const init = () => {
  const game = getGameInfo();
  document.querySelector('#btn__continue').style.display = game ? 'grid':'none';
}

init();