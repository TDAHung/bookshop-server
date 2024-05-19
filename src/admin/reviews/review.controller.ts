import { AdminReviewService } from './review.service';
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';

@Controller()
export class AdminReviewController {

    constructor(private readonly adminReviewService: AdminReviewService) { }
    @Get("reviews")
    @Render('reviews/index')
    async index() {
        const reviews = await this.adminReviewService.reviews({
            include: {
                user: true,
                book: true,
            },
            orderBy: {
                bookId: 'desc'
            }
        });
        console.log(reviews);
        return {
            path: 'reviews',
            reviews,
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
    edit(@Param('id') id: number) {

        return {
            book: {}
        }
    }


    @Post("reviews/new")
    createBook(@Body() params: any) {
        return params.name;
    }
}
