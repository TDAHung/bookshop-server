import { Module } from "@nestjs/common";
import { AdminChatService } from "./chat.service";
import { AdminChatController } from "./chat.controller";

@Module({
    providers: [AdminChatService],
    controllers: [AdminChatController]
})
export class AdminChatModule { }
