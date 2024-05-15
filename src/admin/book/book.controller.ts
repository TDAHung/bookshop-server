import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';

@Controller()
export class AdminBookController {


    @Get("books")
    @Render('books/index')
    index() {
        return {
            message: 'asdasdadsdad'
        }
    }

    @Get("books/create")
    @Render('books/create')
    create() {
        return {
            book: {
                name: "asdasd"
            }
        }
    }


    @Get("books/edit")
    @Render('books/edit')
    edit(@Param('id') id: number,) {

        return {
            book: {}
        }
    }


    @Post("books/new")
    createBook(@Body() params: any) {
        return params;
    }
}
