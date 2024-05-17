import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';

@Controller()
export class AdminHomeController {


    @Get()
    @Render('home/index')
    index() {
        return {
            path: '/',
            message: 'asdasdadsdad'
        }
    }
}
