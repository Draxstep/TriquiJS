export function initUI(socket, state, emitEvent) {
    const nameInput = document.getElementById('player-name');
    const btnCreate = document.getElementById('btn-create');
    const gameIdInput = document.getElementById('game-id-input');
    const btnJoin = document.getElementById('btn-join');
    const btnRestart = document.getElementById('btn-restart');
    const btnBack = document.getElementById('btn-back');
    const cells = document.querySelectorAll('.cell');

    // Crear partida
    btnCreate.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) return alert('Por favor, ingresa tu nombre.');

        state.playerName = name;
        emitEvent(socket, 'create_game', { playerName: name });
    });

    // Entrar a una partida
    btnJoin.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const gameId = gameIdInput.value.trim();
        if (!name) return alert('Por favor, ingresa tu nombre.');
        if (!gameId) return alert('Por favor, ingresa el ID de la partida.');

        state.playerName = name;
        state.gameId = gameId; // Guardamos el ID en el estado local
        emitEvent(socket, 'join_game', { playerName: name, gameId });
    });

    // Celda
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // Enviamos el movimiento al servidor si tenemos un ID de partida
            if (state.gameId) {
                emitEvent(socket, 'make_move', { gameId: state.gameId, index: parseInt(index) });
            }
        });
    });

    // Restart
    btnRestart.addEventListener('click', () => {
        if (state.gameId) {
            emitEvent(socket, 'restart_game', { gameId: state.gameId });
        }
    });

    // Volver
    btnBack.addEventListener('click', () => {
        if (state.gameId) {
            emitEvent(socket, 'leave_game', { gameId: state.gameId });
            state.gameId = null;
            showWelcomeScreen();
        }
    });
}
export function showGameScreen(gameId) {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    document.getElementById('display-game-id').innerText = gameId;
}

export function updateStatus(message) {
    document.getElementById('status-message').innerText = message;
}

export function renderBoard(board, winningLine = null) {
    const cells = document.querySelectorAll('.cell');
    board.forEach((val, index) => {
        cells[index].innerText = val ? val : '';
        cells[index].classList.remove('winning-cell');
        if (winningLine && winningLine.includes(index)) {
            cells[index].classList.add('winning-cell');
        }
    });
}

export function showWelcomeScreen() {
    document.getElementById('welcome-screen').style.display = 'flex';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-id-input').value = '';
}
