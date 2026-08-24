import { updateStatus, renderBoard, showGameScreen } from './ui.js';

export function initSocket(socket, state) {

    // Connect event
    socket.on('connect', () => {
        console.log('Connected to server', socket.id);
    });

    // TODO: Add socket event listeners (game_created, game_joined, update_board, game_over, etc.)
    // Example:
    /*
    socket.on('game_created', (data) => {
        state.gameId = data.gameId;
        state.mySymbol = 'X'; // Creator usually gets X
        showGameScreen(state.gameId);
        updateStatus('Esperando a otro jugador...');
    });
    */
}

export function emitEvent(socket, eventName, payload) {
    socket.emit(eventName, payload);
}
