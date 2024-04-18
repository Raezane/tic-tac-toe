const startGame = (function () {

    const dialog = document.querySelector('dialog');
    const close = document.querySelector('form > button');

    dialog.showModal();
    close.addEventListener('click', initiateGame)

})();


function interactables () {

    const namePlayer1 = document.querySelector('#firstplayerName');
    const namePlayer2 = document.querySelector('#secondplayerName');

    const firstplayer = document.querySelector('.leftside > p:first-child');
    const secondplayer = document.querySelector('.rightside > p:first-child');

    const cells = document.querySelectorAll('.cell');

    return {namePlayer1, namePlayer2, firstplayer, secondplayer, cells};
};


function createPlayers() {

    const {firstplayer, secondplayer, namePlayer1, namePlayer2} = interactables()

    playerOne = Player(namePlayer1.value, 'O');
    playerTwo = Player(namePlayer2.value, 'X');

    firstplayer.textContent = namePlayer1.value;
    secondplayer.textContent = namePlayer2.value;

    return [playerOne, playerTwo];

};


function initiateGame () {
    
    const {cells} = interactables();

    let indexnumber = 0
    cells.forEach((cell) => {
        cell.setAttribute('cellIndex', indexnumber)
        cell.addEventListener('click', checkIfEmpty);
        indexnumber += 1;
    });

    

};

function checkIfEmpty () {

    const players = createPlayers();
    console.log(players)

    let whoseTurn = players[0].getMark();

    const board = [0,1,2,3,4,5,6,7,8];
    let gamemark;
    let clickedCell;

    if (this.hasChildNodes() == false) {
        let gamemark = document.createElement('p');
        gamemark.textContent = 'O';
        this.appendChild(gamemark);
        clickedCell = board[this.getAttribute('cellIndex')];
        //find corresponding clicked cell and board index/number and update gameboard with gamemark
        if (this.getAttribute('cellIndex') == clickedCell) {
            board[clickedCell] = whoseTurn;
        };
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