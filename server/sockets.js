const store = require('./store');
const gameLogic = require('./gameLogic');

function setupSockets(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            // TODO: Handle user disconnection, update game state, notify other player
        });

        // Add game socket events here
        // e.g. 'join_game', 'create_game', 'make_move'
    });
}

module.exports = setupSockets;
