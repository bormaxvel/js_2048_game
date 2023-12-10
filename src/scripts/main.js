/* eslint-disable max-len */
'use strict';

// write your code here
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-console */


const cellsList = Array.from(document.querySelectorAll('.field-cell'));
const procesingOrder = {
  ArrowRight: [
    [cellsList[0], cellsList[1], cellsList[2], cellsList[3]],
    [cellsList[4], cellsList[5], cellsList[6], cellsList[7]],
    [cellsList[8], cellsList[9], cellsList[10], cellsList[11]],
    [cellsList[12], cellsList[13], cellsList[14], cellsList[15]],
  ],
  ArrowLeft: [
    [cellsList[3], cellsList[2], cellsList[1], cellsList[0]],
    [cellsList[7], cellsList[6], cellsList[5], cellsList[4]],
    [cellsList[11], cellsList[10], cellsList[9], cellsList[8]],
    [cellsList[15], cellsList[14], cellsList[13], cellsList[12]],
  ],
  ArrowDown: [
    [cellsList[0], cellsList[4], cellsList[8], cellsList[12]],
    [cellsList[1], cellsList[5], cellsList[9], cellsList[13]],
    [cellsList[2], cellsList[6], cellsList[10], cellsList[14]],
    [cellsList[3], cellsList[7], cellsList[11], cellsList[15]],
  ],
  ArrowUp: [
    [cellsList[12], cellsList[8], cellsList[4], cellsList[0]],
    [cellsList[13], cellsList[9], cellsList[5], cellsList[1]],
    [cellsList[14], cellsList[10], cellsList[6], cellsList[2]],
    [cellsList[15], cellsList[11], cellsList[7], cellsList[3]],
  ],
};
const gameScore = document.querySelector('.game-score');
const startBtn = document.querySelector('.start');
const messageWin = document.querySelector('.message-win');
const messageLose = document.querySelector('.message-lose');
const messageStart = document.querySelector('.message-start');

// console.log(messageStart.cellsList);

startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('start')) {
    messageStart.classList.add('hidden');
    startBtn.classList.replace('start', 'restart');
    startBtn.textContent = 'Restart';
    addRandom();
    addRandom();
  } else {
    messageStart.classList.remove('hidden');
    messageWin.classList.add('hidden');
    messageLose.classList.add('hidden');
    startBtn.classList.replace('restart', 'start');
    cellsList.forEach(cell => writeToCell(cell, 0));
    startBtn.textContent = 'Start';
    gameScore.textContent = 0;
  }
});


function addRandom() {
  const freeCells = cellsList.filter(cell => cell.classList.length === 1);
  const newCellNumber = Math.floor(Math.random() * freeCells.length);
  let newCellVallue = 2;

  if (Math.random() >= 0.9) {
    newCellVallue = 4;
  }

  // console.log('random', freeCells[newCellNumber]);

  if (freeCells.length > 1) {
    writeToCell(freeCells[newCellNumber], newCellVallue);
  }

  if (freeCells.length === 1) {
    writeToCell(freeCells[newCellNumber], newCellVallue);

    if (
      !ifMergable(procesingOrder['ArrowRight'])
      && !ifMergable(procesingOrder['ArrowDown'])
    ) {
      messageLose.classList.remove('hidden');
    }
  }
}

function ifMergable(order) {
  return order.some(lineOrder => {
    for (let i = 0; i < 3; i++) {
      if (lineOrder[i].textContent === lineOrder[i + 1].textContent) {
        // console.log(lineOrder[i], lineOrder[i + 1]);

        return true;
      }
    }
  });
}

function writeToCell(cell, number) {
  if (number === 0) {
    cell.className = 'field-cell';
    cell.textContent = '';
  } else {
    cell.className = 'field-cell';
    cell.classList.add(`field-cell--${number}`);
    cell.textContent = number;
  }
}


const arrows = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

document.addEventListener('keydown', eventtt => {
  const key = arrows.find(arrow => arrow === eventtt.key);

  if (key) {
    const order = procesingOrder[key];
    let ifMovement = false;

    // console.log('new key');

    order.forEach(lineOrder => {
      // console.log('new line');

      for (let i = 3, prevContent = -1, previndex = 3; i >= 0; i--) {
        let cellContent = lineOrder[i].textContent;

        if (cellContent) {
          // console.log('status: prevContent = ', prevContent, 'previndex  =', previndex);


          if (cellContent === prevContent) {
            // console.log('if0');
            // console.log(i, lineOrder[i]);
            // console.log(previndex, lineOrder[previndex]);
            writeToCell(lineOrder[previndex], prevContent * 2);
            writeToCell(lineOrder[i], 0);
            cellContent *= 2;
            prevContent = -1;
            i = previndex;
            ifMovement = true;
            gameScore.textContent = Number(gameScore.textContent) + cellContent;

            if (cellContent === 2048) {
              messageWin.classList.remove('hidden');
            }
          }



          if (i !== previndex) {
            if (lineOrder[previndex].textContent && i !== previndex - 1) {
              // console.log('if1');
              // console.log(i, lineOrder[i]);
              // console.log(previndex - 1, lineOrder[previndex - 1]);
              writeToCell(lineOrder[previndex - 1], cellContent);
              writeToCell(lineOrder[i], 0);
              previndex = previndex - 1;
              prevContent = cellContent;
              ifMovement = true;
            } else if (!lineOrder[previndex].textContent) {
              // console.log('if2');
              // console.log(i, lineOrder[i]);
              // console.log(previndex, lineOrder[previndex]);
              writeToCell(lineOrder[previndex], cellContent);
              writeToCell(lineOrder[i], 0);

              prevContent = cellContent;
              ifMovement = true;
            } else {
              // console.log('else');
              prevContent = cellContent;
              previndex = i;
            }
          } else {
            prevContent = cellContent;
          }
        }
      }
    });

    if (ifMovement) {
      addRandom();
    }
  }
});





// const numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

// console.log(getCellIndex(cellsList[0]));
// function getCellIndex(cell) {
//   const rowIndex = cell.parentElement.rowIndex;
//   const cellIndex = cell.cellIndex;

//   return [rowIndex, cellIndex];
// }
