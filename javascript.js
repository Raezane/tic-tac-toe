const gameBoard = (function () {
    const board = [0,1,2,3,4,5,6,7,8];

    return {board};

})();

function createPlayer (name) {

    const playerName = name
    
    let score = 0;

    const scoreUp = () => ++score;
    const getScore = () => score;

    return {playerName, scoreUp, getScore};
};

function Player(name, XorO) {

    const player = createPlayer(name);
    const mark = XorO;
};

function clickHandler() {

};

const gameHandler = (function () {

    let turns = 9;
    let playerOne = Player('playerO', 'O');
    let playerTwo = Player('playerX', 'X');

    let whoseTurn = playerOne.mark;

    for (i = 1; i < 9; ++i) {

        let move = Math.floor(Math.random()*8)

        gameBoard.board[move] = whoseTurn;
        
        whoseTurn === playerOne.mark ? playerTwo.mark : playerOne.mark
    }
    
})();