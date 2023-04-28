import { createServer } from "http";
import { Server } from "socket.io";

import listen from "./sockets.js";
import apiServer from "./api.js";

const server = createServer(apiServer);
const socketServer = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

listen(socketServer);
