const newGrid = (size) => {
  let arr = new Array(size);

  for (let i = 0; i < size; i++) {
    arr[i] = new Array(size);
  }
  for (let i = 0; i < Math.pow(size, 2); i++) {
    arr[Math.floor(i/size)][i%size] = CONSTANT.UNASSIGNED;
  }
  return arr;
}
// check duplicate number in col
const isColSafe = (grid, col, value) => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
}
// check duplicate number in row
const isRowSafe = (grid, row, value) => {
  for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
    if (grid[row][col] === value) return false;
  }
  return true;
}
// check duplicate number in 3x3 box
const isBoxSafe = (grid, boxRow, boxCol, value) => {
  for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
    for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
      if (grid[row + boxRow][col + boxCol] === value) return false;
    }
  }
  return true;
}
// check in row, col and 3x3 box
const isSafe = (grid, row, col, value) => {
  return isColSafe(grid, col, value) && isRowSafe(grid, row, value)
  && isBoxSafe(grid, row - row%3, col - col%3,)
}