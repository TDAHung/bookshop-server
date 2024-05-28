import { AdminUserSerivce } from './../users/user.service';
import { Body, Controller, Get, Param, Post, Render, Session, UseFilters, UseGuards } from '@nestjs/common';
import { AdminOrderService } from '../order/order.service';
import { AdminBookService } from '../book/book.service';
import { AdminReviewService } from '../reviews/review.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';

@Controller()
@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
export class AdminHomeController {
    constructor(
        private readonly adminOrderSerivce: AdminOrderService,
        private readonly adminBookService: AdminBookService,
        private readonly adminReviewService: AdminReviewService,
        private readonly adminUserSerivce: AdminUserSerivce,
    ) { }
    private readonly PATH = 'homes';
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
    @Get()
    @Render('home/index')
    async index(
        @Session() session: any
    ) {
        const totalPrice = await this.adminOrderSerivce.totalPrice(12);
        const mostPopularBook = await this.adminBookService.getMostPopularBook();
        const totalPriceLast6Months: any = await this.adminOrderSerivce.totalPrice(6);

        let total6months: number = 0;
        totalPriceLast6Months.forEach((total: any) => {
            total6months += total.total_price
        });

        const orders = await this.adminOrderSerivce.orders({
            where: {
                status: "PENDING"
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const userWithMostTotalOrder = await this.adminUserSerivce.getUserWithMostOrderCompleted(1);
        const avgReviewStars = await this.adminReviewService.avgStar();
        return this.render('index', {
            totalPrice,
            mostPopularBook,
            total6months,
            orders,
            userWithMostTotalOrder: userWithMostTotalOrder[0],
            avgReviewStars: avgReviewStars,
            user: session.passport.user
        })
    }
}
