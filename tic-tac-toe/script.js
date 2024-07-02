// The game board
let board = ['', '', '', '', '', '', '', '', ''];

// The current player (X or O)
let currentPlayer = 'X';

const winner = document.getElementById("winner");
const resetBtn = document.getElementById("reset-btn");
const cell = document.getElementsByClassName("cell")

resetBtn.onclick = () => {
	resetBtn.classList.add("hide");
	currentPlayer = 'X';
	winner.innerHTML = "";
	playGame();
}

// The AI's move
let aiMove = () => {
  // Get the best move using the Minimax algorithm
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
	  console.log(score, bestScore);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

// The Minimax algorithm
let minimax = (board, depth, isMaximizing) => {
  if (checkWin(board, 'O')) {
    return  10 - depth;
  } else if (checkWin(board, 'X')) {
    return depth - 10;
  } else if (isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
};

// Check if the board is full
let isBoardFull = (board) => {
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      return false;
    }
  }
  return true;
};

// Check if a player has won
let checkWin = (board, player) => {
  if ((board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)) {
    return true;
  }
  return false;
};

// The game loop
let playGame = () => {
  // Initialize the game board
  for (let i = 0; i < 9; i++) {
    board[i] = '';
  }

  // Display the game board
  document.getElementById('cell-0').innerHTML = board[0];
  document.getElementById('cell-1').innerHTML = board[1];
  document.getElementById('cell-2').innerHTML = board[2];
  document.getElementById('cell-3').innerHTML = board[3];
  document.getElementById('cell-4').innerHTML = board[4];
  document.getElementById('cell-5').innerHTML = board[5];
  document.getElementById('cell-6').innerHTML = board[6];
  document.getElementById('cell-7').innerHTML = board[7];
  document.getElementById('cell-8').innerHTML = board[8];

  const gameBoard = document.getElementById("game-board")
  
  for(let i = 0; i < 9; i ++){
	cell.item(i).onclick = () => userTurn(i);
  }
  // Start the game
  
};

// Start the game
playGame();

let aiTurn = () => {

    // Make the AI's move
    let bestMove = aiMove();
	if (bestMove < 0)
		return;
    board[bestMove] = 'O';
	

	console.log("Best Move", bestMove)
    // Display the updated game board
    cellMove = document.getElementById(`cell-${bestMove}`);
	cellMove.innerHTML = board[bestMove];
	cellMove.classList.add("cell-O");

    // Check if the AI has won
    if (checkWin(board, 'O')) {
      winner.innerHTML = 'AI wins!';
	  resetBtn.classList.remove("hide")
	  gameOver();
      return;
    } else if(isBoardFull(board)) {
		resetBtn.classList.remove("hide")
		winner.innerHTML = 'Match Draw!';
		gameOver();
		return;
	}
	// Switch the current player
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

let userTurn = (move) => {
	
	if(board[move] === ""){
		board[move] = currentPlayer;

		// Display the updated game board
		cellMove = document.getElementById(`cell-${move}`);
		cellMove.innerHTML = board[move];
		cellMove.classList.add("cell-X");
		// Check if the user has won
		if (checkWin(board, 'X')) {
			winner.innerHTML = 'You win!';
			resetBtn.classList.remove("hide")
			gameOver();
			return;
		} else if(isBoardFull(board)) {
			resetBtn.classList.remove("hide")
			winner.innerHTML = 'Match Draw!';
			gameOver();
			return;
		}
		// Switch the current player
		currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
		aiTurn();
	}
}

let gameOver = () => {
	for( c of cell){
		c.onclick = () => { console.log("noop") }
	}
}
