import { showGameScreen, updateStatus, renderBoard, showWelcomeScreen } from './ui.js';

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

    socket.on('game_start', (data) => {
        renderBoard(data.board);
        const activePlayerName = data.names[data.turn];
        const turnMessage = activePlayerName === state.playerName
            ? '¡Es tu turno!'
            : `Turno de ${activePlayerName}...`;
        updateStatus(turnMessage);
    });

    socket.on('update_state', (data) => {
        renderBoard(data.board);

        if (data.winner === 'Tie') {
            updateStatus('¡Es un empate! 🤝');
        } else if (data.winner) {
            updateStatus(`¡El ganador es ${data.names[data.winner]}! 🏆`);
        } else {
            const activePlayerName = data.names[data.turn];
            const turnMessage = activePlayerName === state.playerName
                ? '¡Es tu turno!'
                : `Turno de ${activePlayerName}...`;
            updateStatus(turnMessage);
        }
    });

    // ⚙️ Tarea 5: Desconexión
    socket.on('player_disconnected', () => {
        alert('El oponente se ha desconectado. 🔌');
        state.gameId = null;
        showWelcomeScreen();
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
