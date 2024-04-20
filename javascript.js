(function() {

  const domElements = {

    dialog : document.querySelector('dialog'),
    close : document.querySelector('form > button'),

    namePlayer1: document.querySelector('#firstplayerName'),
    namePlayer2 : document.querySelector('#secondplayerName'),

    firstplayer : document.querySelector('.leftside > p:first-child'),
    secondplayer : document.querySelector('.rightside > p:first-child'),

    cells : document.querySelectorAll('.cell')
  };

  const playerManagement = { 

    playerOne: undefined,
    playerTwo: undefined,

    createPlayers: function () {
      this.playerOne = Player(domElements.namePlayer1.value, 'O');
      this.playerTwo = Player(domElements.namePlayer2.value, 'X');

    },

    addPlayerNames: function () {
      domElements.firstplayer.textContent = domElements.namePlayer1.value,
      domElements.secondplayer.textContent = domElements.namePlayer2.value
    }
  };

  const gameBoard = {

    board: [0,1,2,3,4,5,6,7,8], 

    getBoard: () => board,
    setPlayerMark: function(mark) {
      board[4] = mark;
    }
  };

  const startGame = (function () {

    domElements.dialog.showModal();
    domElements.close.addEventListener('click', gameHandler);

  })();

  function gameHandler () {
    
    playerManagement.createPlayers();
    playerManagement.addPlayerNames();

    const cells = domElements.cells;

    let indexnumber = 0
    cells.forEach((cell) => {
      cell.setAttribute('cellIndex', indexnumber)
      cell.addEventListener('click', checkIfEmpty);
      indexnumber += 1;
    });

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

  function checkIfEmpty (e) {

    console.log(playerManagement.playerOne);

    console.log(board.getBoard());
    const players = createPlayers();

    console.log(players)

    let whoseTurn = players[0].getMark();
    board.setPlayerMark(whoseTurn);
    console.log(board.getBoard());

    let gamemark;
    let clickedCell;

    if (this.hasChildNodes() == false) {
      let gamemark = document.createElement('p');
      gamemark.textContent = whoseTurn;
      this.appendChild(gamemark);
      clickedCell = board[this.getAttribute('cellIndex')];
      //find corresponding clicked cell and board index/number and update board with gamemark
      if (this.getAttribute('cellIndex') == clickedCell) {
        board[clickedCell] = whoseTurn;
      };
    };
  };


  function checkIfWon (whoseTurn) {
    if (board.board[0] == whoseTurn && board.board[1] == whoseTurn && board.board[2] == whoseTurn) {
        return true;
    } else if (board.board[3] == whoseTurn && board.board[4] == whoseTurn && board.board[5] == whoseTurn) {
        return true;
    } else if (board.board[6] == whoseTurn && board.board[7] == whoseTurn && board.board[8] == whoseTurn) {
        return true;
    } else if (board.board[0] == whoseTurn && board.board[3] == whoseTurn && board.board[6] == whoseTurn) {
        return true;
    } else if (board.board[1] == whoseTurn && board.board[4] == whoseTurn && board.board[7] == whoseTurn) {
        return true;
    } else if (board.board[2] == whoseTurn && board.board[5] == whoseTurn && board.board[8] == whoseTurn) { 
        return true;
    } else if (board.board[0] == whoseTurn && board.board[4] == whoseTurn && board.board[8] == whoseTurn) { 
        return true;
    } else if (board.board[2] == whoseTurn && board.board[4] == whoseTurn && board.board[6] == whoseTurn) { 
        return true;
      };

    return false;
  };

  /*

  const adsdsd = (function () {

      let whoseTurn = playerTwo.getMark();

      board.board[4] = whoseTurn;
      board.board[8] = whoseTurn;
      board.board[0] = whoseTurn;
      
          board.showGameStatus();
          
          if (checkIfWon(whoseTurn)) {
              switch (whoseTurn) {
                  case playerOne.getMark():
                      console.log('PlayerOne wins!');
                      break;
                  case playerTwo.getMark():
                      console.log('PlayerTwo wins!');
                      break;
                  };
              };
      
      whoseTurn === playerOne.getMark() ? whoseTurn = playerTwo.getMark() : whoseTurn = playerOne.getMark();

      return {playerOne, playerTwo}

  })();

  */

})();