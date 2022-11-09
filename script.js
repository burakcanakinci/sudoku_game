const inputName = document.querySelector('#input__name')
const screenStart = document.querySelector('#screen__start')

document.querySelector('#btn__play').addEventListener('click', () => {
  if (inputName.value.trim().length > 0) {
    alert('start game')
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