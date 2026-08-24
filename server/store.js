// In-memory state
// We'll store games and players here
const state = {
    games: {}, // e.g. { 'game123': { id: 'game123', players: [{id, name, symbol}], board: [], turn: 'X', status: 'waiting' } }
    players: {} // e.g. { 'socketId123': { name: 'Player 1', gameId: 'game123' } }
};

module.exports = state;
