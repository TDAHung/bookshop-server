import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';

@Controller()
export class AdminReviewController {


    @Get("reviews")
    @Render('reviews/index')
    index() {
        return {
            path: 'reviews',
            message: 'asdasdadsdad'
        }
    }

    @Get("reviews/create")
    @Render('reviews/create')
    create() {
        return {
            book: {
                name: "asdasd"
            }
        }
    }


    @Get("reviews/edit")
    @Render('reviews/edit')
    edit(@Param('id') id: number,) {

        return {
            book: {}
        }
    }


    @Post("reviews/new")
    createBook(@Body() params: any) {
        return params.name;
    }
}
