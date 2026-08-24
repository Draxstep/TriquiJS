// server/store.js

// Almacenamiento en memoria del estado (Partidas)
const games = {};

// Genera un código de 4 dígitos aleatorio para la sala
const generateGameId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Ej: "5924"
};

// Crea una nueva partida con su estado inicial
const createGame = () => {
    const gameId = generateGameId();
    
    games[gameId] = {
        id: gameId,
        players: {
            X: null, // Guardará el socket.id del jugador X
            O: null  // Guardará el socket.id del jugador O
        },
        names: {
            X: '', // Nombre del jugador X
            O: ''  // Nombre del jugador O
        },
        board: Array(9).fill(null), // Tablero de 9 posiciones vacías
        turn: 'X', // Siempre empieza la X
        winner: null // 'X', 'O', 'Tie' (Empate) o null
    };

    return games[gameId];
};

// Obtiene una partida por su ID
const getGame = (gameId) => {
    return games[gameId];
};

// Encuentra en qué partida está un jugador usando su socket.id
const findGameBySocketId = (socketId) => {
    for (const gameId in games) {
        const game = games[gameId];
        if (game.players.X === socketId || game.players.O === socketId) {
            return game;
        }
    }
    return null;
};

// Elimina una partida de la memoria
const deleteGame = (gameId) => {
    delete games[gameId];
};

module.exports = {
    games,
    createGame,
    getGame,
    findGameBySocketId,
    deleteGame
};