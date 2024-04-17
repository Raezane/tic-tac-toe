const gameBoard = (function () {
    const board = [0,1,2,3,4,5,6,7,8];
    
    function showGameStatus() {
        console.log(board);
    }

    return {board, showGameStatus};

})();

const interactables = (function () {

    const dialog = document.querySelector('dialog');
    const close = document.querySelector('form > button');
    const namePlayer1 = document.querySelector('#firstplayerName');
    const namePlayer2 = document.querySelector('#secondplayerName');

    const firstplayer = document.querySelector('.leftside > p:first-child');
    const secondplayer = document.querySelector('.rightside > p:first-child');

    const cells = document.querySelectorAll('.cell');

    close.addEventListener('click', createPlayers);
    
    cells.forEach((cell) => {
        cell.addEventListener('click', gameHandler);
    });

    return {namePlayer1, namePlayer2, dialog, close, firstplayer, secondplayer, cells};
})();


function createPlayers() {

    let playerOne = Player(interactables.namePlayer1.value, 'O');
    let playerTwo = Player(interactables.namePlayer2.value, 'X');

    interactables.firstplayer.textContent = interactables.namePlayer1.value;
    interactables.secondplayer.textContent = interactables.namePlayer2.value;

    return {playerOne, playerTwo};

};


function gameHandler() {

    console.log(interactables.cells);

    let whoseTurn = createPlayers.playerOne

    if (this.hasChildNodes() == false) {
        let gamemark = document.createElement('p');
        gamemark.textContent = 'O';
        this.appendChild(gamemark);
    };
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

const startGame = (function () {

    interactables.dialog.showModal();

})();

const adsdsd = (function () {

    let whoseTurn = playerTwo.getMark();

    gameBoard.board[4] = whoseTurn;
    gameBoard.board[8] = whoseTurn;
    gameBoard.board[0] = whoseTurn;
    
        gameBoard.showGameStatus();
        
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