import { Body, Controller, Get, Param, Post, Query, Render, Res, Session, UseFilters, UseGuards } from '@nestjs/common';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminOrderService } from './order.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';

@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
@Controller("orders")
export class AdminOrderController {
    constructor(private readonly adminOrderSerivice: AdminOrderService) { }
    private readonly PATH = 'orders';
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
    @Render('orders/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') searchParams?: string,
    ) {
        const search: string | undefined = searchParams || '';
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.orders;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const orders = await this.adminOrderSerivice.orders({
            take,
            skip,
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            },
            where: {
                OR: [
                    {
                        address: {
                            contains: search
                        }
                    }
                ]
            },
            orderBy: {
                updatedAt: 'asc',
            },
        });
        const total = await this.adminOrderSerivice.total({
            where: {
                OR: [
                    {
                        address: {
                            contains: search
                        }
                    }
                ]
            }
        });

        return this.render('index', {
            orders,
            paging: {
                total,
                page: Number(page),
                limit,
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            },
            user: session.passport.user
        });
    }

    @Get('edit/:id')
    @Render('orders/edit')
    async edit(
        @Session() session: any,
        @Param('id') id: string
    ) {
        const order = await this.adminOrderSerivice.order(
            {
                id: Number(id),
            },
            {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                },
                orderItems: {
                    include: {
                        book: true,
                    },
                },
            },
        );

        return this.render('edit', {
            order,
            user: session.passport.user
        });
    }


    @Post('update/:id')
    async update(@Param('id') id: string, @Body() params: any, @Res() res) {
        console.log(params);
        await this.adminOrderSerivice.update(
            {
                where: {
                    id: Number(id)
                },
                data: {
                    status: params.status,
                }
            }
        );

        return res.redirect("/orders");
    }
}
