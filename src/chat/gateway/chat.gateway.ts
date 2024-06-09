import { OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('websocket id: ', socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: any, @MessageBody() payload: any) {
    console.log(payload);
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: payload
    });
  }
}
