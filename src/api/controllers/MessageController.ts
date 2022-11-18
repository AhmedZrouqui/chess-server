import {
    OnConnect,
    SocketController,
    ConnectedSocket,
    OnDisconnect,
    MessageBody,
    OnMessage,
    SocketIO,
} from 'socket-controllers';
  
  import { Socket, Server } from 'socket.io';
  
  @SocketController()
  export default class MessageController {
    @OnConnect()
    onConnection(@ConnectedSocket() socket: Socket, @SocketIO() server: Server ) {
      console.log('new socket connected', socket.id);
    }
  
    @OnDisconnect()
    disconnect(@ConnectedSocket() socket: Socket) {
      console.log('client disconnected');
    }
  
    @OnMessage('ping')
    save(@ConnectedSocket() socket: any, @MessageBody() message: any) {
      console.log('received message:', message);
      console.log('setting id to the message and sending it back to the client');
      message.id = 1;
      socket.emit('pong');
    }

    @OnMessage('message_test')
    messageTest(@ConnectedSocket() socket: any, @MessageBody() message: any) {
      console.log('received message:', message);
      socket.emit('message_back')
    }
  }