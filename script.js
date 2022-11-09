const getGameInfo = () => JSON.parse(localStorage.getItem('game'));

const init = () => {
  const game = getGameInfo();
  document.querySelector('#btn__continue').style.display = game ? 'grid':'none';
}

init();