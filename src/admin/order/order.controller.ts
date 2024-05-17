import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminOrderService } from './order.service';

@Controller()
export class AdminOrderController {

    constructor(private readonly adminOrderSerivice: AdminOrderService) { }

    @Get("orders")
    @Render("orders/index")
    async index(
        @Query('page') page?: string
    ) {
        const take: number | undefined = ItemsPerPage.books;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const orders = await this.adminOrderSerivice.orders({
            take,
            skip,
            include: {
                user: {
                    select: {
                        id: true
                    }
                },
                orderItems: {
                    include: {
                        book: {
                            select: {
                                images: true,
                                title: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return {
            path: 'orders',
            orders,
        }
    }

    @Get("order/edit/:id")
    @Render("orders/edit")
    async edit(@Param('id') id: string) {
        const order = await this.adminOrderSerivice.order(
            {
                id: Number(id)
            },
            {
                user: true,
                orderItems: {
                    include: {
                        book: true
                    }
                }
            }
        );

        console.log(order.orderItems[0].book);

        return {
            path: 'orders',
            order,
        }
    }
}
