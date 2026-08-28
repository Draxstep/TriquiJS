// Entry point for the frontend application
import { initSocket, emitEvent } from './socket.js';
import { initUI } from './ui.js';

// Global state for frontend
const state = {
    playerName: '',
    gameId: null,
    mySymbol: null,
    isMyTurn: false
};

// Initialize Socket connection
const socket = io();
initSocket(socket, state);

// Initialize UI events
initUI(socket, state, emitEvent);

export { state };
