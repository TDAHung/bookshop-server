import { Module } from "@nestjs/common";
import { AdminChatService } from "./chat.service";
import { AdminChatController } from "./chat.controller";
import { AdminUserSerivce } from "../users/user.service";
import { PrismaService } from "src/prisma.service";

@Module({
    providers: [AdminChatService, AdminUserSerivce, PrismaService],
    controllers: [AdminChatController]
})
export class AdminChatModule { }
