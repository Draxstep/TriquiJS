export function initUI(socket, state, emitEvent) {
    // DOM Elements
    const nameInput = document.getElementById('player-name');
    const btnCreate = document.getElementById('btn-create');
    const gameIdInput = document.getElementById('game-id-input');
    const btnJoin = document.getElementById('btn-join');
    const btnRestart = document.getElementById('btn-restart');
    const cells = document.querySelectorAll('.cell');

    // Create Game
    btnCreate.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) return alert('Por favor, ingresa tu nombre.');
        state.playerName = name;

        // TODO: Emit create_game event
        // emitEvent(socket, 'create_game', { playerName: name });
        console.log('Clicked Create Game');
    });

    // Join Game
    btnJoin.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const gameId = gameIdInput.value.trim();
        if (!name) return alert('Por favor, ingresa tu nombre.');
        if (!gameId) return alert('Por favor, ingresa el ID de la partida.');

        state.playerName = name;

        // TODO: Emit join_game event
        // emitEvent(socket, 'join_game', { playerName: name, gameId });
        console.log('Clicked Join Game', gameId);
    });

    // Cell Clicks
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            // TODO: Emit move if it's my turn
            console.log('Cell clicked:', index);
        });
    });

    // Restart Game
    btnRestart.addEventListener('click', () => {
        // TODO: Emit restart event
        console.log('Clicked Restart');
    });
}

// UI Updaters
export function showGameScreen(gameId) {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('display-game-id').innerText = gameId;
}

export function updateStatus(message) {
    document.getElementById('status-message').innerText = message;
}

export function renderBoard(boardData) {
    const cells = document.querySelectorAll('.cell');
    boardData.forEach((val, i) => {
        cells[i].innerText = val ? val : '';
        // Styling based on X or O
        if(val === 'X') cells[i].classList.add('text-blue-600');
        if(val === 'O') cells[i].classList.add('text-red-600');
    });
}
