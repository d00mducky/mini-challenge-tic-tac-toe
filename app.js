// selectors
const gameBoard = document.getElementById('game-board');
const c1r1 = document.getElementById('c1r1');
const c2r1 = document.getElementById('c2r1');
const c3r1 = document.getElementById('c3r1');
const c1r2 = document.getElementById('c1r2');
const c2r2 = document.getElementById('c2r2');
const c3r2 = document.getElementById('c3r2');
const c1r3 = document.getElementById('c1r3');
const c2r3 = document.getElementById('c2r3');
const c3r3 = document.getElementById('c3r3');


// global variables
let playItem = true;
let allCells = [c1r1, c2r1, c3r1, c1r2, c2r2, c3r2, c1r3, c2r3, c3r3];


// helper functions
function appendPlayItem(cell) {
  // if the given cell already has an appended item
  if (cell.children.length) {
    // tell user to select a different square or restart
    alert('This square has already been played! Please select an empty square or restart the game ! :)')
  } else {
    let h2 = document.createElement('h2');
    if (playItem) {
      h2.append('O');
    } else {
      h2.append('X');
    }
    cell.append(h2);
    playItem = !playItem;
  }
}

function checkForWinner(cell) {
  let allPlays = [];
  let colOne = [];
  let colTwo = [];
  let colThree = [];


}

// initialize game board
if (gameBoard != null) {
  for(let i = 0; i < gameBoard.rows.length; i++) {
    for (let j = 0; j < gameBoard.rows[i].cells.length; j++) {
      gameBoard.rows[i].cells[j].onclick = function (event) {
        console.log(event.target);
        appendPlayItem(this);
        checkForWinner(this);
      }
    }
  }
}

// make the first play
(() => {
  let rand = Math.floor(Math.random() * 9);
  let firstPlay = document.createElement('h2');
  firstPlay.append('X');
  allCells[rand].append(firstPlay)
})();

