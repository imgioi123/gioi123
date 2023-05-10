const ROW_COUNT = 10;
const COLUMN_COUNT = 20;
const DISTANCE = 10;
const CELL_SIZE = 40;
const CELL_VALUE_DEFAULT = "";
const CELL_VALUE_X = "X";
const CELL_VALUE_O = "O";

class Cell {
  constructor(rIdx, cIdx) {
    this.rowIndex = rIdx;
    this.colIndex = cIdx;
    this.value = CELL_VALUE_DEFAULT;
  }

  getCellHtml = function () {
    let leftDistance = DISTANCE + this.colIndex * CELL_SIZE;
    let topDistance = DISTANCE + this.rowIndex * CELL_SIZE;
    return `<div id="cell_${this.rowIndex}_${this.colIndex}" class="cell" style="left: ${leftDistance}px; top: ${topDistance}px;">${this.value}</div>`;
  };
}

let banCo = document.getElementById("gameboard");
banCo.innerHTML = "";
for (let iR = 0; iR < ROW_COUNT; iR++) {
  for (let idx = 0; idx < COLUMN_COUNT; idx++) {
    let newCell = new Cell(iR, idx);
    banCo.innerHTML += newCell.getCellHtml();
  }
}
