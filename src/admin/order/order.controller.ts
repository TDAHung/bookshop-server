import { Body, Controller, Get, Param, Post, Query, Render, Res } from '@nestjs/common';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminOrderService } from './order.service';

@Controller("orders")
export class AdminOrderController {
    constructor(private readonly adminOrderSerivice: AdminOrderService) { }

    @Get()
    @Render('orders/index')
    async index(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
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
            orderBy: {
                updatedAt: 'asc',
            },
        });
        const total = await this.adminOrderSerivice.total();

        return {
            path: 'orders',
            orders,
            paging: {
                total,
                page: Number(page),
                limit,
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            }
        };
    }

    @Get('edit/:id')
    @Render('orders/edit')
    async edit(@Param('id') id: string) {
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

        return {
            path: 'orders',
            order,
        };
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
