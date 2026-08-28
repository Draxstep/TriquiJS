import { showGameScreen, updateStatus, renderBoard } from './ui.js';

export function initSocketListeners(socket, state) {
    socket.on('game_created', (data) => {
        state.gameId = data.gameId;
        showGameScreen(state.gameId);
        updateStatus('Partida creada. Pasa el ID a tu oponente y espera a que se una.');
    });

    socket.on('game_joined', (data) => {
        state.gameId = data.gameId;
        showGameScreen(state.gameId);
        updateStatus('Te has unido a la partida. Esperando actualización del servidor...');
    });

    socket.on('update_state', (data) => {
        // data asume tener: board (array), currentPlayer (string), winner (string), isDraw (boolean)
        renderBoard(data.board);

        if (data.winner) {
            updateStatus(`¡El ganador es ${data.winner}! 🏆`);
        } else if (data.isDraw) {
            updateStatus('¡Es un empate! 🤝');
        } else {
            const turnMessage = data.currentPlayer === state.playerName
                ? '¡Es tu turno!'
                : `Turno del oponente (${data.currentPlayer})...`;
            updateStatus(turnMessage);
        }
    });

    // ⚙️ Tarea 5: Desconexión
    socket.on('player_disconnected', () => {
        updateStatus('El oponente se ha desconectado. 🔌');
    });

    // Manejo de errores (opcional pero recomendado)
    socket.on('game_error', (data) => {
        alert(data.message);
    });
}
export function initSocket(socket, state) {
    initSocketListeners(socket, state);
}

export function emitEvent(socket, eventName, data) {
    socket.emit(eventName, data);
}
