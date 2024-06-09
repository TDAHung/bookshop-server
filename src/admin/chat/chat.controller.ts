import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AdminChatController {
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
        return this.render('index,', {

        });
    }
}
