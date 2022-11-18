import { Server } from "socket.io";
import { useSocketServer } from "socket-controllers"
import MessageController from "./api/controllers/MessageController";

export default (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    useSocketServer(io, { controllers: [MessageController] })

    return io;
}