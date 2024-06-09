import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AdminUserSerivce {
    constructor(private readonly prismaService: PrismaService) { }

    getUserWithMostOrderCompleted = async (
        limit?: number
    ) => {
        try {
            const user = await this.prismaService.$queryRaw`
            select u."firstName" || ' ' || u."lastName" AS full_name,
            SUM(o.total) AS max_total,
            COUNT(o.id) AS total_orders
            from "User" u
            join "Order" o ON u.id  = o."userId"
            where o.status = 'COMPLETED'
            group by full_name
            order by max_total desc
            limit ${limit};`;
            return user;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
        }
    }

    user = async (
        params: {
            where?: Prisma.UserWhereUniqueInput
            include?: Prisma.UserInclude
        }
    ) => {
        const { where, include } = params;
        try {
            return await this.prismaService.user.findFirst(
                {
                    where,
                    include
                }
            );
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }


    users = async (
        params: {
            where?: Prisma.UserWhereInput,
            include?: Prisma.UserInclude,
            orderBy?: Prisma.UserOrderByWithRelationInput
        }
    ) => {
        const { where, include } = params;
        try {
            return await this.prismaService.user.findMany({
                where,
                include
            })
        } catch (error) {

        }
    }
}
