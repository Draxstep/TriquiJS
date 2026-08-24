# Arquitectura del Proyecto: Triqui en Línea (Monolito Modular)

## Resumen
Este proyecto es una aplicación de tres en raya (Triqui) multijugador en tiempo real. Utiliza una arquitectura de **Monolito Modular**, donde el Frontend (Cliente) y el Backend (Servidor) residen en el mismo repositorio pero mantienen una estricta separación de responsabilidades.

## Stack Tecnológico
- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML5, Vanilla JavaScript (ES Modules), Tailwind CSS (vía CDN)
- **Estado:** En memoria (RAM) gestionado por el servidor.

## Estructura de Directorios

```text
/
├── public/                 # Archivos estáticos servidos por Express (Frontend)
│   ├── index.html          # Interfaz de usuario y maquetado con Tailwind
│   ├── css/                # Archivos CSS adicionales si son necesarios
│   └── js/                 # Lógica del cliente usando ES Modules
│       ├── main.js         # Punto de entrada, inicializa socket y estado global
│       ├── socket.js       # Manejo exclusivo de eventos Socket.io (escuchar/emitir)
│       └── ui.js           # Manipulación del DOM y registro de Event Listeners
├── server/                 # Código del servidor Node.js (Backend)
│   ├── index.js            # Configuración de Express y servidor HTTP
│   ├── sockets.js          # Controladores de eventos de Socket.io
│   ├── store.js            # Almacenamiento en memoria del estado (Partidas, Jugadores)
│   └── gameLogic.js        # Reglas del juego (validar movimientos, detectar ganador)
├── package.json
└── ARCHITECTURE.md
```

## Flujo de Datos y Eventos Socket.io

El servidor es la **Fuente de la Verdad**. Toda la lógica de negocio y validación de jugadas se hace en `server/gameLogic.js`. El frontend se encarga únicamente de capturar intenciones del usuario, enviarlas y renderizar el estado que dicta el servidor.

### Eventos Cliente -> Servidor (Emits desde el cliente)
- `create_game`: `{ playerName: string }` -> El usuario quiere crear una sala.
- `join_game`: `{ playerName: string, gameId: string }` -> El usuario quiere entrar a una sala existente.
- `make_move`: `{ gameId: string, index: number }` -> El usuario seleccionó una casilla (0-8).
- `restart_game`: `{ gameId: string }` -> Solicitud para reiniciar el tablero.

### Eventos Servidor -> Cliente (Emits desde el servidor)
- `game_created`: `{ gameId: string, symbol: 'X' }` -> Confirma la creación de sala.
- `game_joined`: `{ gameId: string, symbol: 'O' }` -> Confirma el ingreso a la sala.
- `game_start`: `{ board: array, turn: 'X' }` -> Notifica que la sala está llena y empieza el juego.
- `update_state`: `{ board: array, turn: 'X' o 'O', winner: 'X'|'O'|'Tie'|null }` -> Envia el nuevo estado después de un movimiento.
- `error_message`: `{ message: string }` -> Si el cliente intenta hacer una acción no válida (casilla ocupada, no es su turno).
- `player_disconnected`: `{}` -> Notifica que el oponente se fue.
