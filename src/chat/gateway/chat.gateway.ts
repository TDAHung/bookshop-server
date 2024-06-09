import { OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { ChatService } from '../chat.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) { }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('websocket id: ', socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: any, @MessageBody() payload: any) {
    console.log(JSON.parse(payload));
    const data = JSON.parse(payload);
    const message = await this.chatService.create({
      content: data.content,
      userId: data.userId
    })
    this.server.emit('onMessage', {
      content: message
    });
  }
}
