import { AdminUserSerivce } from './../admin/users/user.service';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatGateway } from './gateway/chat.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChatResolver, ChatService, ChatGateway, AdminUserSerivce, PrismaService],
})
export class ChatModule { }
