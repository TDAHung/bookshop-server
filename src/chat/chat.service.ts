import { PrismaService } from './../prisma.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {

  constructor(private readonly prismaService: PrismaService) { }

  create = async (
    data: Prisma.MessageUncheckedCreateInput,
    include: Prisma.MessageInclude,
  ) => {
    try {
      const message = await this.prismaService.message.create({
        data,
        include
      });
      return message;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  messages = async (
    params: {
      where?: Prisma.MessageWhereInput,
      include?: Prisma.MessageInclude,
      orderBy?: Prisma.MessageOrderByWithRelationInput,
    }
  ) => {
    const { where, include, orderBy } = params;
    try {
      const messages = await this.prismaService.message.findMany({
        where,
        include,
        orderBy
      });
      return messages;
    } catch (error) {
      throw error;
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
