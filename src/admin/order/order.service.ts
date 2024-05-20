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
