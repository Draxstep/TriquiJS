# División de Tareas

Dado que el proyecto utiliza una arquitectura modular y hemos definido el contrato de Sockets en `ARCHITECTURE.md`, ambos desarrolladores pueden trabajar en paralelo en ramas separadas sin generar conflictos en Git.

## Desarrollador 1: Frontend (Rama: `feature/frontend`)
**Responsabilidades:** Interfaz de usuario, manipulación del DOM, emitir eventos de Sockets y reaccionar a respuestas del servidor.

**Tareas específicas:**
1. **Lobby (Login/Creación/Unión):**
   - En `public/js/ui.js`, capturar los datos de los inputs y llamar a `emitEvent` en `public/js/main.js` para `create_game` o `join_game`.
   - Mostrar el ID de la partida generada para que el creador se lo pase a su oponente.
2. **Tablero de Juego:**
   - En `public/js/socket.js`, escuchar los eventos `game_start` y `update_state`.
   - En `public/js/ui.js`, implementar la función `renderBoard` que toma un arreglo de 9 posiciones y dibuja las X y O.
   - Ocultar la pantalla de Lobby y mostrar la del juego al recibir `game_created` o `game_joined`.
3. **Control de Turnos visual:**
   - Mostrar un mensaje en pantalla indicando de quién es el turno o si se está esperando al oponente.
4. **Interacción y Jugabilidad:**
   - En `public/js/ui.js`, capturar los clicks en las casillas y emitir `make_move` con el índice.
5. **Fin del juego y Reinicio:**
   - Mostrar el nombre del ganador o si es empate (leyendo la data de `update_state`).
   - Habilitar el botón de "Reiniciar" y emitir `restart_game` al hacer click. Manejar visualmente si un jugador se desconecta (`player_disconnected`).

---

## Desarrollador 2: Backend (Rama: `feature/backend`)
**Responsabilidades:** Configuración del servidor, manejo de estado en memoria, validación de reglas de juego y emisión de sockets.

**Tareas específicas:**
1. **Manejo de Salas (Store):**
   - En `server/store.js`, implementar la estructura para guardar partidas. Generar un `gameId` aleatorio (por ejemplo, un código de 4 dígitos) cuando se crea una partida.
2. **Sockets de Inicio de Juego:**
   - En `server/sockets.js`, escuchar `create_game`. Guardar al jugador (socket.id) como 'X' y emitir `game_created`.
   - Escuchar `join_game`. Validar que la sala exista y tenga un espacio. Asignar 'O' al nuevo jugador, unir ambos sockets a un "room" de Socket.io y emitir `game_start`.
3. **Lógica de Movimientos (Game Logic):**
   - Escuchar `make_move`. Validar en el servidor:
     - Que el juego no haya terminado.
     - Que sea el turno del jugador que emite el evento.
     - Que la casilla seleccionada esté vacía (`null`).
   - Si es inválido, emitir `error_message` a ese cliente.
   - Si es válido, actualizar el tablero en `server/store.js`.
4. **Detección de Ganador/Empate:**
   - Después de cada movimiento, usar las funciones en `server/gameLogic.js` para verificar si alguien ganó o hubo empate.
   - Actualizar el estado del juego (winner, next turn) y emitir `update_state` a toda la sala (`io.to(gameId).emit(...)`).
5. **Reinicio y Desconexión:**
   - Escuchar `restart_game`, limpiar el tablero en el store y emitir `update_state` inicial de nuevo.
   - Escuchar `disconnect` (evento de Socket.io base), encontrar en qué partida estaba el jugador, y notificar a su oponente con `player_disconnected`.
