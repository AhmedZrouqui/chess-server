var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { OnConnect, SocketController, ConnectedSocket, OnDisconnect, MessageBody, OnMessage, SocketIO, } from "socket-controllers";
import { Socket, Server } from "socket.io";
let MessageController = class MessageController {
    onConnection(socket, server) {
        console.log("new socket connected =>", socket.id);
    }
    disconnect(socket) {
        console.log("client disconnected");
    }
    save(socket, message) {
        //message body object should have current state of the game at the emitter side.
        console.log("received message:", message);
        console.log("setting id to the message and sending it back to the client");
        message.id = 1;
        socket.emit("pong", "pong");
    }
};
__decorate([
    OnConnect(),
    __param(0, ConnectedSocket()),
    __param(1, SocketIO()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Server]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "onConnection", null);
__decorate([
    OnDisconnect(),
    __param(0, ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "disconnect", null);
__decorate([
    OnMessage("ping"),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "save", null);
MessageController = __decorate([
    SocketController()
], MessageController);
export default MessageController;
//# sourceMappingURL=MessageController.js.map