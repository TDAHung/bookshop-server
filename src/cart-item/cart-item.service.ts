import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private readonly prismaService: PrismaService) { }
  create = async (data: Prisma.CartItemUncheckedCreateInput) => {
    try {
      const cartItem = await this.prismaService.cartItem.create({
        data,
      });
      console.log(cartItem);
      return cartItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all cartItem`;
  }

  async cartItem(
    params: {
      where: Prisma.CartItemWhereInput,
    }
  ) {
    try {
      const { where } = params;
      return this.prismaService.cartItem.findFirst(
        {
          where,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  update = async (
    params: {
      where: Prisma.CartItemWhereUniqueInput,
      data: Prisma.CartItemUncheckedUpdateInput,
      include?: Prisma.CartItemInclude,
    }
  ) => {
    try {
      const { where, data, include } = params;
      data.updatedAt = new Date();
      const cartItem = await this.prismaService.cartItem.update({
        where,
        data,
        include
      });
      return cartItem;
    } catch (error) {
      throw error;
    }
  }
  remove = async (params: {
    where: Prisma.CartItemWhereUniqueInput
  }) => {
    const { where } = params;
    return await this.prismaService.cartItem.delete({
      where
    })
  }
}
