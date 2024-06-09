import { Controller, Get, Render } from "@nestjs/common";
import { AdminUserSerivce } from "../users/user.service";

@Controller()
export class AdminChatController {

    constructor(private readonly adminUserService: AdminUserSerivce) { }

    private readonly PATH = 'chat';
    private render(
        method: string,
        options: any = {}
    ) {
        return {
            path: this.PATH,
            method,
            ...options
        };
    }
    @Get('chat')
    @Render("chat/index")
    async index() {
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
                receivedMessages: true
            }
        });

        const getLatestMessageTime = (messages) => {
            return messages.reduce((latest, message) => {
                const messageTime = new Date(message.createdAt);
                return messageTime > latest ? messageTime : latest;
            }, new Date(0));
        };

        users.sort((a, b) => {
            const aLatestSent = getLatestMessageTime(a.sentMessages);
            const aLatestReceived = getLatestMessageTime(a.receivedMessages);
            const aLatest = aLatestSent > aLatestReceived ? aLatestSent : aLatestReceived;

            const bLatestSent = getLatestMessageTime(b.sentMessages);
            const bLatestReceived = getLatestMessageTime(b.receivedMessages);
            const bLatest = bLatestSent > bLatestReceived ? bLatestSent : bLatestReceived;

            return bLatest - aLatest;
        });


        users.forEach(user => {
            // @ts-ignore
            user.message = user.sentMessages.concat(user.receivedMessages);
            // @ts-ignore
            user.message.sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            });
        });

        return this.render('index,', {
            users
        });
    }
}
