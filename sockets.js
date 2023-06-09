let readyPlayerCount = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    let room;
    console.log(`a user connected ${socket.id}`);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);

      console.log(`player ready ${socket.id} ${room}`);

      readyPlayerCount++;

      if (readyPlayerCount % 2 === 0) {
        // emit to all clients
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      // broadcast paddle move to all clients except sender
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      // broadcast ball move to all clients except sender
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`client ${socket.id} disconnected ${reason}`);
      socket.leave(room);
    });
  });
}

export default listen;
