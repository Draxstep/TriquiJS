# TriquiJS (Tic-Tac-Toe en Línea)

¡Bienvenido a **TriquiJS**! Este es un juego de Triqui (Tic-Tac-Toe) multijugador en tiempo real construido con Node.js, Express, y Socket.io.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente viene con Node.js)

## Instalación

1. Clona este repositorio o descarga los archivos.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Instala las dependencias ejecutando:

   ```bash
   npm install
   ```

## Ejecución

Puedes iniciar el servidor de dos maneras:

- **Modo Desarrollo:** (Usa `nodemon` para reiniciar el servidor automáticamente al hacer cambios)
  ```bash
  npm run dev
  ```
- **Modo Producción:**
  ```bash
  npm start
  ```

Una vez que el servidor esté en ejecución, abre tu navegador web y visita: `http://localhost:3000`

## Cómo Jugar

1. **Jugador 1 (Creador):**
   - Ingresa tu nombre.
   - Haz clic en **Crear Partida**.
   - Comparte el **ID de Partida** (un número de 4 dígitos) con tu oponente.
2. **Jugador 2 (Oponente):**
   - Ingresa tu nombre.
   - Ingresa el **ID de Partida** proporcionado por el Jugador 1.
   - Haz clic en **Unirse**.
3. **El Juego:**
   - ¡A jugar! El jugador que creó la partida (X) tiene el primer turno.
   - Selecciona las casillas alternando turnos hasta que un jugador gane o haya un empate.
   - Al terminar, cualquiera de los dos jugadores puede presionar **Reiniciar Juego** para jugar de nuevo en la misma sala.