import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminPromotionListService {
    constructor(private readonly prismaService: PrismaService) { }

    promotion = async (
        params: {
            where?: Prisma.PromotionWhereInput,
            include?: Prisma.PromotionInclude,
        }
    ) => {
        try {
            const { where, include } = params;
            return await this.prismaService.promotion.findFirst({
                where,
                include
            });
        } catch (error) {
            throw error;
        }
    }

    promotions = async (
        params: {
            skip?: number,
            take?: number,
            include?: Prisma.PromotionInclude,
            cursor?: Prisma.PromotionWhereUniqueInput,
            where?: Prisma.PromotionWhereInput,
            orderBy?: Prisma.PromotionOrderByWithRelationInput;
        }
    ) => {
        try {
            const { skip, take, cursor, where, orderBy, include } = params;
            return await this.prismaService.promotion.findMany({
                take,
                skip,
                include,
                where,
                cursor,
                orderBy
            })
        } catch (error) {
            throw error;
        }
    }

    create = async (
        data: Prisma.PromotionUncheckedCreateInput
    ) => {
        try {
            return await this.prismaService.promotion.create({
                data
            });
        } catch (error) {
            throw error;
        }
    }

    delete = async (
        params: {
            where?: Prisma.PromotionWhereUniqueInput
        }
    ) => {
        try {
            const { where } = params;
            return await this.prismaService.promotion.delete({
                where
            });
        } catch (error) {
            throw error;
        }
    }

    total = async (
        params: {
            where?: Prisma.PromotionWhereInput
        }
    ) => {
        try {
            const { where } = params;
            return await this.prismaService.promotion.count({
                where
            });
        } catch (error) {
            throw error;
        }
    }
}
