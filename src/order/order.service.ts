import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createOrderInput: CreateOrderInput) {
    return 'This action adds a new order';
  }

  order = async (
    params: {
      where: Prisma.OrderWhereUniqueInput,
      include?: Prisma.OrderInclude,
    }
  ) => {
    try {
      const { where, include } = params;
      const order = await this.prismaService.order.findUniqueOrThrow({
        where,
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
  ) => {
    const { skip, take, cursor, where, orderBy, include } = params;
    const reivews = await this.prismaService.order.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy
    });
    return reivews;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
