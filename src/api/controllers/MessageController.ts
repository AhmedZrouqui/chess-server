import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  OnDisconnect,
  SocketIO,
} from "socket-controllers";

import { Socket, Server } from "socket.io";

@SocketController()
export default class MessageController {
  @OnConnect()
  onConnection(@ConnectedSocket() socket: Socket, @SocketIO() server: Server) {
    console.log("new socket connected =>", socket.id);
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: Socket) {
    console.log("client disconnected");
  }
}
