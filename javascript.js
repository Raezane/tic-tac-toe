const gameBoard = (function () {
    const board = [0,1,2,3,4,5,6,7,8];
    
    function showGameStatus() {
        console.log(board);
    }

    return {board, showGameStatus};

})();

const clickables = (function () {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', moveMade);
    });
})();

function moveMade() {
    this.textContent = 'ASD'
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

const gameHandler = (function () {
    let playerOne = Player('playerO', 'O');
    let playerTwo = Player('playerX', 'X');

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

})();