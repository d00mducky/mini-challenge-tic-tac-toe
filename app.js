const gameBoard = document.getElementById('game-board');
let playItem = false;


if (gameBoard != null) {
  for(let i = 0; i < gameBoard.rows.length; i++) {
    for (let j = 0; j < gameBoard.rows[i].cells.length; j++) {
      gameBoard.rows[i].cells[j].onclick = function (event) {
        // tableText(this);
        console.log(event.target);
        appendPlayItem(this);
        checkForWinner(this);
      }
    }
  }
}

function tableText(cell) {
  // alert(cell);
  console.log(cell.innerHTML);
}

function checkForWinner(cell) {

}

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

    playItem = !playItem;
    cell.append(h2);
  }
}

