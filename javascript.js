(function() {

  const domElements = {

    dialog : document.querySelector('dialog'),
    close : document.querySelector('form > button'),

    gamestatus : document.querySelector('.gamestatus'),

    namePlayer1: document.querySelector('#firstplayerName'),
    namePlayer2 : document.querySelector('#secondplayerName'),

    firstplayer : document.querySelector('.leftside > p:first-child'),
    secondplayer : document.querySelector('.rightside > p:first-child'),

    playerOneScore : document.querySelector('.leftside > p:nth-child(3)'),
    playerTwoScore : document.querySelector('.rightside > p:nth-child(3)'),

    cells : document.querySelectorAll('.cell'),

    retry : document.querySelector('.center > button')
  };

  //Game starts here, by asking player names
  const startGame = (function () {

    domElements.retry.style.display = 'none';
    domElements.dialog.showModal();
    domElements.close.addEventListener('click', setPlayers);

  })();

  function setPlayers () {
    
    //check if players are already created when taking a new round
    if (playerManagement.playersCreated == false) {
      playerManagement.createPlayers();
      playerManagement.addPlayerNames();
      playerManagement.playersCreated = true;
    };
    
    playerManagement.changeTurn();
    domElements.gamestatus.textContent = `${playerManagement.turn.name}'s Turn!`;

    let indexnumber = 0
    domElements.cells.forEach((cell) => {
      cell.setAttribute('cellIndex', indexnumber)
      cell.addEventListener('click', gameHandler);
      indexnumber += 1;
    });

  };

  const playerManagement = { 

    playerOne: undefined,
    playerTwo: undefined,
    playersCreated: false,
    turn: undefined,
    numberOfTurn: 0,

    createPlayers: function () {

      let playerOneName = domElements.namePlayer1.value;
      let playerTwoName = domElements.namePlayer2.value;

      //if given name is empty, then name will be Player 1 and/or Player Two
      playerOneName == '' ? this.playerOne = Player('Player One', 'O') : this.playerOne = Player(playerOneName, 'O');
      playerTwoName == '' ? this.playerTwo = Player('Player Two', 'X') : this.playerTwo = Player(playerTwoName, 'X');
    },

    addPlayerNames: function () {
      domElements.firstplayer.textContent = this.playerOne.name,
      domElements.secondplayer.textContent = this.playerTwo.name
    },

    changeTurn: function () {
      (this.turn == undefined || this.turn == this.playerTwo) ? this.turn = this.playerOne : this.turn = this.playerTwo;
    },

    emptyTurns: function () {
      this.numberOfTurn = 0;
    },

    addTurn: function () {
      this.numberOfTurn += 1;
    },

    getNumberOfTurn: function () {
      return this.numberOfTurn
    }

  };

  const gameBoard = {

    board: [0,1,2,3,4,5,6,7,8], 

    setPlayerMark: function(mark) {
      this.board[4] = mark;
    },

    resetBoard: function() {
      this.board = [0,1,2,3,4,5,6,7,8];
    }
  };

  function Player (name, mark) {
    this.name = name;
    this.mark = mark;

    let score = 0;

    const getMark = () => mark;
    const scoreUp = () => ++score;
    const getScore = () => score;

    return {name, getMark, scoreUp, getScore};

  };

  function gameHandler () {

    whoseTurn = playerManagement.turn.getMark()

    if (this.hasChildNodes() == false) {
      PlayerMove(whoseTurn, this);
      if (checkIfWon(whoseTurn) == false) {
        playerManagement.changeTurn();
      };
      playerManagement.addTurn();
      domElements.gamestatus.textContent = `${playerManagement.turn.name}'s Turn!`;

    };

    if (playerManagement.numberOfTurn >= 5) {
      if (checkIfWon(whoseTurn)) {
        
        domElements.gamestatus.textContent = `${playerManagement.turn.name} WINS!!!`
        domElements.gamestatus.style.color = `green`;
        playerManagement.turn.scoreUp();
        
        playerManagement.turn == playerManagement.playerOne ? domElements.playerOneScore.textContent = playerManagement.playerOne.getScore()
        : domElements.playerTwoScore.textContent = playerManagement.playerTwo.getScore();
    
        removeCellListeners();

        domElements.retry.style.display = 'block';
        domElements.retry.addEventListener('click', startNewRound);
      }

      else if (checkIfDraw()) {

        domElements.gamestatus.textContent = `IT'S A DRAW!`;
        domElements.gamestatus.style.color = `orange`;
    
        removeCellListeners();

        domElements.retry.style.display = 'block';
        domElements.retry.addEventListener('click', startNewRound);

      };
    };
  };

  function removeCellListeners() {
    domElements.cells.forEach((cell) => {
      cell.removeEventListener('click', gameHandler);
    });
  };

  function startNewRound() {
    gameBoard.resetBoard();
    domElements.gamestatus.style.color = 'black';
    domElements.retry.style.display = 'none';
    domElements.cells.forEach((cell) => {
      cell.textContent = '';
    });
    playerManagement.emptyTurns();
    setPlayers();
    
  }

  function PlayerMove (whoseTurn, currentCell) {

    let gamemark = document.createElement('p');
    gamemark.textContent = whoseTurn;
    currentCell.appendChild(gamemark);
    let clickedCell = gameBoard.board[currentCell.getAttribute('cellIndex')];
    
    //find corresponding clicked cell and board index/number and update board with gamemark
    if (currentCell.getAttribute('cellIndex') == clickedCell) {
      gameBoard.board[clickedCell] = whoseTurn;
    };

  };

  function checkIfDraw() {
    if (playerManagement.getNumberOfTurn() === 9) {
      return true;
    }
    return false;
  }


  function checkIfWon (whoseTurn) {
    if (gameBoard.board[0] == whoseTurn && gameBoard.board[1] == whoseTurn && gameBoard.board[2] == whoseTurn) {
        return true;
    } else if (gameBoard.board[3] == whoseTurn && gameBoard.board[4] == whoseTurn && gameBoard.board[5] == whoseTurn) {
        return true;
    } else if (gameBoard.board[6] == whoseTurn && gameBoard.board[7] == whoseTurn && gameBoard.board[8] == whoseTurn) {
        return true;
    } else if (gameBoard.board[0] == whoseTurn && gameBoard.board[3] == whoseTurn && gameBoard.board[6] == whoseTurn) {
        return true;
    } else if (gameBoard.board[1] == whoseTurn && gameBoard.board[4] == whoseTurn && gameBoard.board[7] == whoseTurn) {
        return true;
    } else if (gameBoard.board[2] == whoseTurn && gameBoard.board[5] == whoseTurn && gameBoard.board[8] == whoseTurn) { 
        return true;
    } else if (gameBoard.board[0] == whoseTurn && gameBoard.board[4] == whoseTurn && gameBoard.board[8] == whoseTurn) { 
        return true;
    } else if (gameBoard.board[2] == whoseTurn && gameBoard.board[4] == whoseTurn && gameBoard.board[6] == whoseTurn) { 
        return true;
      };

    return false;
  };

})();