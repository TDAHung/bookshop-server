import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Order as OrderModel } from '@prisma/client';
import { OrderEntity } from '../../global/entity/order.entity';

@Injectable()
export class AdminOrderService {
    constructor(private readonly prismaService: PrismaService) { }

    order = async (
        reivewWhereUniqueInput: Prisma.OrderWhereUniqueInput,
        include?: Prisma.OrderInclude,
    ): Promise<OrderEntity | null> => {
        try {
            const order = await this.prismaService.order.findUniqueOrThrow({
                where: reivewWhereUniqueInput,
                include
            });
            return order;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    orders = async (
        params: {
            skip?: number,
            take?: number,
            select?: Prisma.OrderSelect,
            include?: Prisma.OrderInclude,
            cursor?: Prisma.OrderWhereUniqueInput,
            where?: Prisma.OrderWhereInput,
            orderBy?: Prisma.OrderOrderByWithRelationInput;
        }
    ): Promise<OrderModel[] | null> => {
        const { skip, take, cursor, where, orderBy, include } = params;
        const reivews = await this.prismaService.order.findMany({
            skip,
            take,
            cursor,
            where,
            include,
            orderBy
        });
        // const responsePosts = posts.map((post) => this.destructuring(post));
        return reivews;
    }

    total = async (
        params: {
            where?: Prisma.OrderWhereInput
        }
    ): Promise<number> => {
        try {
            const { where } = params
            return await this.prismaService.order.count({
                where
            });
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    totalPrice = async (
        limit?: number
    ) => {
        try {
            return await this.prismaService.$queryRaw`SELECT
            TO_CHAR("updatedAt", 'YYYY-MM') AS "month",
            SUM(total) AS total_price
        FROM
            public."Order"
        WHERE
            status = 'COMPLETED'
        GROUP BY
            TO_CHAR("updatedAt", 'YYYY-MM')
        ORDER BY
            "month" DESC
        LIMIT ${limit};`;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    update = async (
        params: {
            where: Prisma.OrderWhereUniqueInput,
            data: Prisma.OrderUncheckedUpdateInput,
            include?: Prisma.OrderInclude,
        }
    ): Promise<OrderModel | null> => {
        try {
            const { where, data, include } = params;
            data.updatedAt = new Date();
            const order = await this.prismaService.order.update({
                where,
                data,
                include
            });
            console.log(order);
            return order;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

}
