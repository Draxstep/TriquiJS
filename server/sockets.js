// server/sockets.js
const { createGame, getGame } = require('./store');
const gameLogic = require('./gameLogic');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Nuevo cliente conectado: ${socket.id}`);

        // 1. Crear una nueva sala
        socket.on('create_game', ({ playerName }) => {
            // Creamos la partida en memoria
            const game = createGame();
            
            // Asignamos al creador como el jugador 'X'
            game.players.X = socket.id;
            game.names.X = playerName;

            // Unimos el socket a una "room" exclusiva de Socket.io usando el gameId
            socket.join(game.id);

            // Respondemos solo al creador confirmando la creación
            socket.emit('game_created', { gameId: game.id, symbol: 'X' });
            
            console.log(`Sala ${game.id} creada por ${playerName} (${socket.id})`);
        });

        // 2. Unirse a una sala existente
        socket.on('join_game', ({ playerName, gameId }) => {
            const game = getGame(gameId);

            // Validaciones
            if (!game) {
                return socket.emit('error_message', { message: 'Error: La sala no existe.' });
            }
            if (game.players.O !== null) {
                return socket.emit('error_message', { message: 'Error: La sala ya está llena.' });
            }

            // Asignamos al segundo jugador como 'O'
            game.players.O = socket.id;
            game.names.O = playerName;

            // Unimos este socket a la misma "room"
            socket.join(gameId);

            // Respondemos al jugador que se acaba de unir
            socket.emit('game_joined', { gameId: game.id, symbol: 'O' });

            // Emitimos a TODOS en la sala (incluyendo a 'X') que el juego empieza
            io.to(gameId).emit('game_start', { 
                board: game.board, 
                turn: game.turn 
            });

            console.log(`${playerName} (${socket.id}) se unió a la sala ${gameId}`);
        });
    
        socket.on('make_move', ({ gameId, index }) => {
            const game = getGame(gameId);

            // Validar que el juego exista
            if (!game) {
                return socket.emit('error_message', { message: 'Error: La partida no existe.' });
            }

            // Validar que el juego no haya terminado
            if (game.winner) {
                return socket.emit('error_message', { message: 'El juego ya ha terminado.' });
            }

            // Validar que sea el turno del jugador que intentó mover
            const isPlayerX = game.players.X === socket.id;
            const isPlayerO = game.players.O === socket.id;
            const isMyTurn = (game.turn === 'X' && isPlayerX) || (game.turn === 'O' && isPlayerO);

            if (!isMyTurn) {
                return socket.emit('error_message', { message: 'No es tu turno.' });
            }

            // Validar que la casilla esté vacía
            if (game.board[index] !== null) {
                return socket.emit('error_message', { message: 'Casilla inválida o ya ocupada.' });
            }

            // --- EJECUTAR MOVIMIENTO ---
            // Marcamos la casilla con el símbolo del jugador actual
            game.board[index] = game.turn;

            // --- DETECTAR GANADOR O EMPATE ---
            const winner = gameLogic.checkWinner(game.board);
            
            if (winner) {
                game.winner = winner; // Puede ser 'X' o 'O'
            } else if (gameLogic.checkTie(game.board)) {
                game.winner = 'Tie';  // Declaramos empate
            } else {
                // Si nadie ha ganado y no hay empate, pasamos el turno al otro jugador
                game.turn = game.turn === 'X' ? 'O' : 'X';
            }

            // Emitimos el nuevo estado del juego a TODOS en la sala
            io.to(gameId).emit('update_state', {
                board: game.board,
                turn: game.turn,
                winner: game.winner
            });
        });
    });
};