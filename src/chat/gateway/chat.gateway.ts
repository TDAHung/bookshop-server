import { OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, ConnectedSocket, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'
import { ChatService } from '../chat.service';
import { AdminUserSerivce } from 'src/admin/users/user.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private chatService: ChatService,
    private adminUserService: AdminUserSerivce
  ) { }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('websocket id: ', socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: any, @MessageBody() payload: any) {
    const data = JSON.parse(payload);

    const message = await this.chatService.create({
      content: data.content,
      senderId: data.senderId,
      receiverId: data.receiverId
    }, {
      sender: true,
      receiver: true,
    });

    const users = await this.adminUserService.users({
      where: {
        AND: [
          {
            sentMessages: {
              some: {},
            },
          }
        ]
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
      },
    });

    const getLatestMessageTime = (messages) => {
      return messages.reduce((latest, message) => {
        const messageTime = new Date(message.createdAt);
        return messageTime > latest ? messageTime : latest;
      }, new Date(0));
    };

    const sortedUsers = users.sort((a, b) => {
      const aLatestSent = getLatestMessageTime(a.sentMessages);
      const aLatestReceived = getLatestMessageTime(a.receivedMessages);
      const aLatest = aLatestSent > aLatestReceived ? aLatestSent : aLatestReceived;

      const bLatestSent = getLatestMessageTime(b.sentMessages);
      const bLatestReceived = getLatestMessageTime(b.receivedMessages);
      const bLatest = bLatestSent > bLatestReceived ? bLatestSent : bLatestReceived;

      return bLatest - aLatest;
    });

    this.server.emit('onMessage', {
      content: message,
      users: sortedUsers
    });
  }

  @SubscribeMessage('clients')
  async handleUsers(@MessageBody() payload: any) {
    const data = JSON.parse(payload);
    const user = await this.adminUserService.user({
      where: {
        id: Number(data.userId)
      },
      include: {
        sentMessages: true,
        receivedMessages: true,
      }
    });

    // @ts-ignore
    user.messages = user.sentMessages.concat(user.receivedMessages);
    user.sentMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    this.server.emit('onUser', {
      user
    })
  }
}
