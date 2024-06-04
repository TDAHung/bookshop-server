import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) { }

  create = async (
    data: Prisma.CartUncheckedCreateInput,
  ) => {
    try {
      const review = await this.prismaService.cart.create({
        data,
      });
      return review;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  // findAll() {
  //   return `This action returns all cart`;
  // }

  async cart(
    params: {
      where: Prisma.CartWhereUniqueInput,
      include?: Prisma.CartInclude,
    }
  ) {
    try {
      const { where, include } = params;
      return await this.prismaService.cart.findFirst(
        {
          where,
          include
        }
      );
    } catch (error) {
      throw error;
    }
  }
  // total = async (
  //   params: {
  //     where: Prisma.CartWhereUniqueInput,
  //   }
  // ) => {
  //   try {
  //     const { where } = params;
  //     return this.cart
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // update(id: number, updateCartInput: UpdateCartInput) {
  //   return `This action updates a #${id} cart`;
  // }

  remove = async (
    params: {
      where: Prisma.CartWhereUniqueInput
    }) => {
    try {
      const { where } = params;
      return await this.prismaService.cart.delete({
        where
      });
    } catch (error) {

    }
  }
}
