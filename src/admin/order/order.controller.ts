import { Body, Controller, Get, Param, Post, Query, Render, Res } from '@nestjs/common';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminOrderService } from './order.service';

@Controller()
export class AdminOrderController {
    constructor(private readonly adminOrderSerivice: AdminOrderService) { }

    @Get('orders')
    @Render('orders/index')
    async index(@Query('page') page?: string) {
        const take: number | undefined = ItemsPerPage.books;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const orders = await this.adminOrderSerivice.orders({
            take,
            skip,
            include: {
                user: {
                    select: {
                        id: true,
                    },
                },
                orderItems: {
                    include: {
                        book: {
                            select: {
                                images: true,
                                title: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return {
            path: 'orders',
            orders,
        };
    }

    @Get('order/edit/:id')
    @Render('orders/edit')
    async edit(@Param('id') id: string) {
        const order = await this.adminOrderSerivice.order(
            {
                id: Number(id),
            },
            {
                user: true,
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


    @Post('order/update/:id')
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
