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
  return isColSafe(grid, col, value)
  && isRowSafe(grid, row, value)
  && isBoxSafe(grid, row - row%3, col - col%3, value)
  && value !== CONSTANT.UNASSIGNED;
}
// find unassigned cell
const findUnassignedPos = (grid, pos) => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
      if (grid[row][col] === CONSTANT.UNASSIGNED) {
        pos.row = row;
        pos.col = col;
        return true;
      }
    }
  }
  return false;
}
// shuffle arr
const shuffleArray = (arr) => {
  let currentIndex = arr.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    let temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}
// check puzzle is complete
const isFullGrid = (grid) => {
  return grid.every((row, i) => {
    return row.every((value, j) => {
      return value !== CONSTANT.UNASSIGNED;
    });
  });
}

const sudokuCreate = (grid) => {
  let unassignedPos = {
    row: -1,
    col: -1
  }
  if (!findUnassignedPos(grid, unassignedPos)) return true;
  let numberList = shuffleArray([...CONSTANT.NUMBERS])
  let row = unassignedPos.row;
  let col = unassignedPos.col;
  numberList.forEach((num, i) => {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;
      if (isFullGrid(grid)) {
        return true;
      } else {
        if (sudokuCreate(grid)) {
          return true;
        }
      }
      grid[row][col] = CONSTANT.UNASSIGNED;
    }
  });
  return isFullGrid(grid);
}
const sudokuCheck = (grid) => {
  let unassignedPos = {
    row: -1,
    col: -1
  }
  if (!findUnassignedPos(grid, unassignedPos)) return true;
  grid.forEach((row, i) => {
    row.forEach((num, j) => {
      if (isSafe(grid, i, j, num)) {
        if (isFullGrid(grid)) {
          return true;
        } else {
            if (sudokuCreate(grid)) {
              return true;
            }
        }
      }
    })
  })
  return isFullGrid(grid);
}
const rand = () => Math.floor(Math.random() * CONSTANT.GRID_SIZE);
const removeCells = (grid, level) => {
  let res = [...grid];
  let attempts = level;
  while (attempts > 0) {
    let row = rand();
    let col = rand();
    while (res[row][col] === 0) {
      row = rand();
      col = rand();
    }
    res[row][col] = CONSTANT.UNASSIGNED;
    attempts--;
  }
  return res;
}
// generate sudoku base on level
const sudokuGen = (level) => {
  let sudoku = newGrid(CONSTANT.GRID_SIZE);
  let check = sudokuCreate(sudoku)
  if (check) {
    let question = removeCells(sudoku, level);
    return {
      original: sudoku,
      question: question
    }
  }
  return undefined;
}