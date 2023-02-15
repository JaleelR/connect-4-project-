/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
//num of clicks determines whos turn it is 
let numClicks = 0;
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

// makeBoard: create in-JS board structure:
 // board = array of rows, each row is array of cells  (board[y][x])
 
function makeBoard() {

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //for every time you create an array
for(let y = 0; y < HEIGHT; y++){
    board[y] = [];
    //complete a whole iteration for for x elements to = null
for(let x = 0; x < WIDTH; x++){
board[y][x] = null;
 }
 } 


} 


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  //you are creating an table row element element
  //the attribute of each "top" will have the id of column-top
  //the top also has an event listener that if you click on the top(tr) the handleclick function will execute 
 let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
//this is making a row of 7 data cells, also setting its id to x.
//appeneds headcell to top
///you are appending the top  of html board
  for (let x = 0; x < WIDTH; x++) {
  let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //You are making the grid
  for (let y = 0; y < HEIGHT; y++) {
  //creating 6 columns("tr") using height as the number not to go past; 
    const row = document.createElement("tr");
 //creating 7 cells ("td") using width as the number not to go past; 
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //setting cells("td") to be `${y}-${x}`)
      //appending cell to row & appending row to html board 
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return  empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
for(let y = HEIGHT - 1; y >= 0; y--){
//i kept putting if its === null. i forget simple steps and oveercomplicate. 
if(!board[y][x]) {
//if so make this empty column space available 
return y;
}
} 
return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */


  // TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
 const piece = document.createElement("div");
    piece.classList.add("piece");

    currPlayer === 2 ? piece.classList.add("p2") : piece.classList.add("p1");
document.getElementById(`${y}-${x}`).append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TOO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    numClicks++;
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 

  placeInTable(y, x);
 board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
if(board.every(col => col.every(row => row !== null))){
   return endGame("Its a tie!");
}
  // switch players
  // TODO: switch currPlayer 1 <-> 2

 numClicks % 2 === 0 ? currPlayer = 1 : currPlayer = 2; 
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
