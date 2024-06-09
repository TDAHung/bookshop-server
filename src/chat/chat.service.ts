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
  ) => {
    try {
      const message = await this.prismaService.message.create({
        data,
      });
      return message;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }


  findAll() {
    return `This action returns all chat`;
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
