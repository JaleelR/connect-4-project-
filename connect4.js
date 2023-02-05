//What I was able to fix 
    //change var to let and const 
   //make functions arrow functions 


   //what i need to work on
    //rereading thecode more than once 
    //wtiting out more thoguhoughly what i need to do 

 //what I still have questions about 
    //updateboard varible (step 6)
    //still having a hard time understanding the questions

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let numClicked = 0
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

let makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    //////////need help this understanding this 
     for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
     }
    }
  
    


/** makeHtmlBoard: make HTML table and row of column tops. */

let makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById("board")
  // TODO: add comment for this code
   //we are creating a row for tables and & each one gets id column top which cant be greater than 7 rows
    //creating a row of cells in a table, everytime you click on a row it will run the handle click funtion 
    //creating the click dotted div outlines
 const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //you are creating a cell for row, appending the cell and to row and each cell gets id(headCell) x.
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
    //appending the row of tables to the html board
  htmlBoard.append(top);

  // TODO: add comment for this code
     //we are creating a height & width using tr for tables and & each one gets id column top. tr cant have height greater than 6 
      //each cell gets an id of y-x

  //creating height, 6 lines of rows
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //creating the width, 7 cells in each row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //appends rows to html board 
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

let findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
   //y = the top height(the very last cell going vertical, so the the 6th cell. y cant be less 0 but we are decreasing )
    //////im not sure what the next line is saying at all 
   for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

let placeInTable = (y, x) => {

  // TODO: make a div and insert into correct table cell
  //need help not potitioning to last cell in column
const piece = document.createElement('div');
 piece.classList.add('piece');
 currPlayer === 1 ? piece.classList.add('one') : piece.classList.add('two');
 //getting element by id bc you cant access that dom element bc its in a function 
const spot = document.getElementById(`${y}-${x}`);
//appending peice into element 
spot.append(piece);

}
 


/** endGame: announce game end */

let endGame = (msg) => {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

 let handleClick = (evt) => {
 
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 ///////////////////////////////////////////////I dont get what this is saying 
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
    //because this is an array inside of array we are going to call the every operator twice, one on the rows and one on the cells 
 if(board.every(cell => cell.every(cell => cell))){
  return endGame('tie!');
 }
 
  // switch players
  // TODO: switch currPlayer 1 <-> 2
   numClicked++;
  numClicked % 2 === 0 ? currPlayer = 1 : currPlayer = 2;
 }
/** checkForWin: check board cell-by-cell for "does a win start here?" */

let checkForWin = () => {
  let _win = cells => {
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
//CHECKING FOR 4 IN A ROW IN DIFFERENT DIRECTIONS 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
   //FOR A HORIZONTAL WIN
    const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       //FOR A VERITICAL WIN
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //FOR A DIAGNAL WIN, MOVING UPWARDS
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//FORVA DIANGAL WIN, MOVING DOWNWARDS
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
//will win if you have 4 horizontally, verticall, diagnal downwards/upwards,
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
