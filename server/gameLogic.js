// Game logic such as checking for winner, validating moves
const gameLogic = {
    // Generate a new empty board
    createBoard: () => Array(9).fill(null),

    // Check if there is a winner using dynamic loops to avoid manual array declaration
    checkWinner: (board) => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i*3] && board[i*3] === board[i*3+1] && board[i*3] === board[i*3+2]) {
                return { symbol: board[i*3], line: [i*3, i*3+1, i*3+2] };
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] && board[i] === board[i+3] && board[i] === board[i+6]) {
                return { symbol: board[i], line: [i, i+3, i+6] };
            }
        }

        // Check diagonals
        if (board[0] && board[0] === board[4] && board[0] === board[8]) {
            return { symbol: board[0], line: [0, 4, 8] };
        }
        if (board[2] && board[2] === board[4] && board[2] === board[6]) {
            return { symbol: board[2], line: [2, 4, 6] };
        }

        return null; // No winner
    },

    // Check if the board is full (tie)
    checkTie: (board) => {
        return board.every(cell => cell !== null);
    }
};

module.exports = gameLogic;
