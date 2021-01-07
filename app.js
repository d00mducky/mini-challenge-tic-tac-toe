// selectors
const gameBoard = document.getElementById('game-board');
const resetBtn = document.getElementById('reset');
const playerOneDisplay = document.getElementById('x-wins');
const playerTwoDisplay = document.getElementById('o-wins');
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
let playItem = false; // X = false, O = true
let playerOneName = '';
let playerTwoName = '';
let playerOneWins = 0;
let playerTwoWins = 0;
let allCells = [c1r1, c2r1, c3r1, c1r2, c2r2, c3r2, c1r3, c2r3, c3r3];
let allCellValues = [];
let totalPlayedItems = 0;


// helper functions
function clickEventHandler(event) {
  appendPlayItem(event.target);
  checkForOutcomes(event.target);
}

function appendPlayItem(cell) {
  // if the given cell already has an appended item
  if (cell.children.length || cell.innerText.length) {
    // tell user to select a different square or restart
    alert('This square has already been played! Please select an empty square or restart the game ! :)');
  } else { // the user selected an unplayed square
    totalPlayedItems++;
    if (totalPlayedItems === 9) {
      alert('Woah!! What a close one ! Better luck next time ! B)')
      resetGameBoard()
    } else {
      let h1 = document.createElement('h1');
      // if the last play was X - append O, else append X -&&- update cell values
      if (playItem) {
        h1.append('0');
        allCellValues[parseInt(cell.id)] = 1;
      } else {
        h1.append('X');
        allCellValues[parseInt(cell.id)] = -1;
      }

      playItem = !playItem;
      cell.append(h1);
    }
  }
}

function checkForOutcomes(cell) {
  let row1 = allCellValues.slice(0, 3);
  let row2 = allCellValues.slice(3, 6);
  let row3 = allCellValues.slice(6);
  let col1 = [];
  let col2 = [];
  let col3 = [];
  let diag1 = [];
  let diag2 = [];

  col1.push(allCellValues[0], allCellValues[3], allCellValues[6]);
  col2.push(allCellValues[1], allCellValues[4], allCellValues[7]);
  col3.push(allCellValues[2], allCellValues[5], allCellValues[8]);
  diag1.push(allCellValues[0], allCellValues[4], allCellValues[8]);
  diag2.push(allCellValues[2], allCellValues[4], allCellValues[6]);

  let outcomes = [row1, row2, row3, col1, col2, col3, diag1, diag2];
  outcomes.some((outcome) => {
    let result = outcome.reduce((a, b) => a + b, 0);
    if (result === -3) {
      alert('Winner !! Congrats ' + playerOneName + ' ! B)');
      playItem = false; // winner starts next round
      playerOneWins++;
      resetGameBoard();
      playerOneDisplay.innerHTML = playerOneName + ' Win Total: ' + playerOneWins;
      return true;
    } else if (result === 3) {
      alert('Winner !! Congrats ' + playerTwoName + ' ! B)');
      playItem = true; // winner starts next round
      playerTwoWins++;
      resetGameBoard();
      playerTwoDisplay.innerHTML = playerTwoName + ' Win Total: ' + playerTwoWins;
      return true;
    }
  });
}

function resetGameBoard() {
  allCells.forEach((cell) => {
    if (cell.children.length) {
      cell.innerHTML = '';
    }
  });

  startGame();
}

function initializeGameBoard() {
  if (gameBoard != null) {
    for(let i = 0; i < gameBoard.rows.length; i++) {
      for (let j = 0; j < gameBoard.rows[i].cells.length; j++) {
        gameBoard.rows[i].cells[j].onclick = clickEventHandler.bind(this);
      }
    }
  }

  if (resetBtn != null) {
    resetBtn.onclick = function (event) {
      resetGameBoard();
    }
  }
}

// initialize game board and make the first play
const startGame = () => {

  allCellValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let rand = Math.floor(Math.random() * 9);
  let firstPlay = document.createElement('h1');
  if (playItem) {
    firstPlay.append('0');
    allCellValues[rand] = 1;
    playItem = false;
  } else {
    firstPlay.append('X');
    allCellValues[rand] = -1;
    playItem = true;
  }

  allCells[rand].append(firstPlay)
  totalPlayedItems = 1;
};

// initialize app
(() => {
  playerOneName = prompt(`What is player one's (CPU) name?`) || 'Player One';
  playerTwoName = prompt(`What is player two's name?`) || 'Player Two';
  playerOneDisplay.innerHTML = playerOneName + `'s Win Total: ` + playerOneWins;
  playerTwoDisplay.innerHTML = playerTwoName + `'s Win Total: ` + playerTwoWins;

  initializeGameBoard();
  startGame();
})();

