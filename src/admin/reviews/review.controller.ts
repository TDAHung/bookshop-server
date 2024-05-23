import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminReviewService } from './review.service';
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query, Render } from '@nestjs/common';

@Controller("reviews")
export class AdminReviewController {

    constructor(private readonly adminReviewService: AdminReviewService) { }
    @Get()
    @Render('reviews/index')
    async index(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.reviews;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const reviews = await this.adminReviewService.reviews({
            take,
            skip,
            include: {
                user: true,
                book: true,
            },
            orderBy: {
                bookId: 'desc'
            }
        });

        const total = await this.adminReviewService.total();
        return {
            path: 'reviews',
            reviews,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            }
        }
    }
}
