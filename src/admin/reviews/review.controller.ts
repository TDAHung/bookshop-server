import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminReviewService } from './review.service';
import { Controller, Get, Query, Render, Session, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';

@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
@Controller("reviews")
export class AdminReviewController {

    constructor(private readonly adminReviewService: AdminReviewService) { }
    @Get()
    @Render('reviews/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') searchParams?: string,
    ) {
        const search: string | undefined = searchParams || "";
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.reviews;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const reviews = await this.adminReviewService.reviews({
            take,
            skip,
            include: {
                user: true,
                book: true,
            },
            where: {
                OR: [
                    {
                        book: {
                            title: {
                                contains: search
                            }
                        }
                    },
                    {
                        comment: {
                            contains: search
                        }
                    }
                ]
            },
            orderBy: {
                bookId: 'desc'
            }
        });

        const total = await this.adminReviewService.total({
            where: {
                OR: [
                    {
                        book: {
                            title: {
                                contains: search
                            }
                        }
                    },
                    {
                        comment: {
                            contains: search
                        }
                    }
                ]
            }
        });
        return {
            path: 'reviews',
            method: 'index',
            reviews,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            },
            user: session.passport.user
        }
    }
}
