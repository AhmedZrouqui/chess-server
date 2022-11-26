import { Server } from "socket.io";
import { useSocketServer } from "socket-controllers";
import MessageController from "./api/controllers/MessageController";
import { AuthController } from "./api/controllers/AuthController";
import { GameController } from "./api/controllers/GameController";

export default (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(io, {
    controllers: [MessageController, AuthController, GameController],
  });

  return io;
};
