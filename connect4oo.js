/*/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */



// active player: 1 or 2
// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

class Player {
  constructor(color){
    this.color = color;
  }
  }
const button = document.getElementById("button");
const col1 = document.getElementById('p1');
const col2 = document.getElementById('p2');
let gameStarted = false;
let game;
button.addEventListener('click', e => {
e.preventDefault();
if (!gameStarted){ 
 let p1 = new Player(col1.value);
let p2 = new Player(col2.value);
game = new Game (p1, p2, 7, 6);
  gameStarted = true; 
 } else {
  game.restart();
 }
});





class Game{
  constructor(p1, p2, WIDTH, HEIGHT){
    this.players = [p1, p2];
  this.WIDTH = WIDTH;
  this.HEIGHT = HEIGHT;
  //varibles have to equal something, if they arent going to be added in the params, make them equal to what they previously where 
  this.board = [];
  this.currPlayer = p1;
  //to make board you have to make sure that its actually being created by putting it in constructor
this.makeBoard();
this.makeHtmlBoard();
this.restart();
  };
  //you dont have to use the "this" for functions
makeBoard() {
   for (let y = 0; y < this.HEIGHT; y++) {
    this.board.push(Array.from({ length: this.WIDTH }));
}
}
makeHtmlBoard() {


  const board = document.getElementById('board');
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  //again you are calling another function make sure you are binding and or using this method
  top.addEventListener('click', this.handleClick = this.handleClick.bind(this));

  for (let x = 0; x < this.WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }

  board.append(top);
  for (let y = 0; y < this.HEIGHT; y++) {
    const row = document.createElement('tr');

    for (let x = 0; x < this.WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
  //not only do you remember to check that you are using "this" for constructors that are being mentioned, but also for methods being mentioned in other methods
}
findSpotForCol(x) {
  for (let y = this.HEIGHT - 1; y >= 0; y--) {
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  console.log("hi");
  piece.style.backgroundColor = this.currPlayer.color;
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  if(spot){
  spot.appendChild(piece);
  }
}

 endGame(msg) {
  alert(msg);
  const top = document.querySelector("#column-top");
  top.removeEventListener('click', this.handleClick = this.handleClick.bind(this));
}


 handleClick = (evt) => {
 
  const x = +evt.target.id;

  const y = this.findSpotForCol(x);
  if (y === null) {
    return;
  }

  
  this.board[y][x] = this.currPlayer;
  this.placeInTable(y, x);
 
  if (this.checkForWin()) {
    return this.endGame(`Player ${this.currPlayer.color} won!`);

  }
  

  if (this.board.every(row => row.every(cell => cell))) {
    return this.endGame('Tie!');
  }

 this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];

}


//always check if it had a return statement 
checkForWin() {
const _win = (cells) => {
return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
       x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
    )
}

  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
    
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

    
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//for event listeners and settimeouts since this will refer to the window use arrow functions
//to make sure restartGame is being implemented put it in constructor instances varibles. 

//how to restart the whole board over. 
//i want to clear everything off of the board
//i can remove all divs from td cells 
//make a new board and delete the old one 
//remember to access each div you have to do it seperatelty by lopping through them 
  restart() {
    //remove sall of the divs from the board 
    const pieces = document.querySelectorAll('.piece');
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].remove();
    }
  //you dont html board because it would literally make another board. so instead you want to access each cell for hight and width and make them equal 0;
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.getElementById(`${y}-${x}`);
        cell.innerHTML = '';
      }
    }
  
  //reset current player so it goes back to plater one then player 2 turn 
  //the board reverts back to empty array so it can run again 
// the make board method will make each element inside of table empty. 
    this.currPlayer;
    this.board = [];
    this.makeBoard();
  }
}


 /* gameOver() {
      if ()
    }*/
 
  
