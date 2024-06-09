import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  providers: [ChatResolver, ChatService, ChatGateway],
})
export class ChatModule { }
