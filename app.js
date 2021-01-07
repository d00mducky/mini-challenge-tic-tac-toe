// selectors
const gameBoard = document.getElementById('game-board');
const c1r1 = document.getElementById('0');
const c2r1 = document.getElementById('1');
const c3r1 = document.getElementById('2');
const c1r2 = document.getElementById('3');
const c2r2 = document.getElementById('4');
const c3r2 = document.getElementById('5');
const c1r3 = document.getElementById('6');
const c2r3 = document.getElementById('7');
const c3r3 = document.getElementById('8');


// global variables
let playItem = true;
let allCells = [c1r1, c2r1, c3r1, c1r2, c2r2, c3r2, c1r3, c2r3, c3r3];
let allCellValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];


// helper functions
function appendPlayItem(cell) {
  // if the given cell already has an appended item
  if (cell.children.length) {
    // tell user to select a different square or restart
    alert('This square has already been played! Please select an empty square or restart the game ! :)')
  } else { // the user selected an unplayed square
    let h1 = document.createElement('h1');
    // if the last play was X - append O, else append X -&&- update cell values
    cell.append(h1);
    if (playItem) {
      h1.append('0');
      allCellValues[parseInt(cell.id)] = 1;
    } else {
      h1.append('X');
      allCellValues[parseInt(cell.id)] = -1;
    }

    // set up playItem for the next play
    playItem = !playItem;
    console.log(allCellValues);
  }
}

function checkForOutcomes(cell) {

  let row1 = allCellValues.slice(0, 3);
  let row2 = allCellValues.slice(3, 6);
  let row3 = allCellValues.slice(6);
  let col1 = []
    , col2 = []
    , col3 = []
    , diag1 = []
    , diag2 = [];

  col1.push(allCellValues[0], allCellValues[3], allCellValues[6]);
  col2.push(allCellValues[1], allCellValues[4], allCellValues[7]);
  col3.push(allCellValues[2], allCellValues[5], allCellValues[8]);
  diag1.push(allCellValues[0], allCellValues[4], allCellValues[8]);
  diag2.push(allCellValues[2], allCellValues[4], allCellValues[6]);

  let outcomes = [row1, row2, row3, col1, col2, col3, diag1, diag2];
  outcomes.some((outcome) => {
    let result = outcome.reduce((a, b) => a + b, 0);
    if (result === -3) {
      alert('Winner !! Congrats player X ! B)');
      return true;
    } else if (result === 3) {
      alert('Winner !! Congrats player O ! B)');
      return true;
    }
  });

  function resetBoard() {

  }
  // allCellValues.forEach((cell) => {

  // })


  // let count = 0;
  // let column1 = allCellValues.map((cell) => {
  //   if (count < 3) {

  //   }
  //   count++
  // })
  // console.log(row1);









  // let allPlays = [[],[],[]];
  // let allPlay = [];
  // let count = 0;
  // for (cell of allCells) {
  //   if (cell.children[0].innerHTML) {
  //     if (cell.children[0].innerHTML == 'O') {
  //       allplay[count] = 1;
  //     } else {
  //       allplay[count] = 2;
  //     }
  //   } else {
  //     allplay[count] = 0;
  //   }
  //   console.log(cell.children[0].innerHTML);
  //   console.log(cell.children.length);
  // }
}

// initialize game board
if (gameBoard != null) {
  for(let i = 0; i < gameBoard.rows.length; i++) {
    for (let j = 0; j < gameBoard.rows[i].cells.length; j++) {
      gameBoard.rows[i].cells[j].onclick = function (event) {
        appendPlayItem(this);
        checkForOutcomes(this);
      }
    }
  }
}

// make the first play
(() => {
  let rand = Math.floor(Math.random() * 9);
  let firstPlay = document.createElement('h1');
  firstPlay.append('X');
  allCells[rand].append(firstPlay)
  allCellValues[rand] = -1;
})();

