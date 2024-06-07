import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PromotionSortBy } from './dto/promotion-query.dto';

@Injectable()
export class PromotionService {
  constructor(private readonly prismaService: PrismaService) { }

  promotions = async (
    params: {
      skip?: number,
      take?: number,
      include?: Prisma.PromotionInclude,
      cursor?: Prisma.PromotionWhereUniqueInput,
      where?: Prisma.PromotionWhereInput,
      orderBy?: Prisma.PromotionOrderByWithRelationInput[] | Prisma.PromotionOrderByWithRelationInput;
    }
  ) => {
    const { skip, take, include, cursor, where, orderBy } = params;
    try {
      return await this.prismaService.promotion.findMany({
        skip,
        take,
        include,
        cursor,
        where,
        orderBy
      });
    } catch (error) {
      throw error;
    }
  }

  promotion = async (
    params: {
      where?: Prisma.PromotionWhereUniqueInput
    }
  ) => {
    try {
      const { where } = params;
      return await this.prismaService.promotion.findFirst({
        where
      });
    } catch (error) {

    }
  }

  orderBy = (
    params: {
      sortByParams?: Array<PromotionSortBy>,
    }
  ) => {
    const { sortByParams } = params;

    let sortBy = [];
    let sortByReview: any = {};
    if (sortByParams && sortByParams.length > 0) {
      sortByParams.forEach(param => {
        switch (param.field) {
          case 'reviews':
            sortByReview = {
              reviews: param.order
            }
            break;
          case 'orders':
            sortBy.push({
              orderItems: {
                _count: param.order
              }
            });
            break;
          default:
            sortBy.push({
              [param.field]: param.order
            })
            break;
        }
      })
    }
    return {
      sortByParams,
      sortByReview
    };
  }
}
