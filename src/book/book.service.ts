import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book as BookModel, Prisma } from '@prisma/client';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) { }

  book = async (
    params: {
      where: Prisma.BookWhereUniqueInput,
      include?: Prisma.BookInclude,
    }

  ): Promise<BookModel | null> => {
    try {
      const { where, include } = params;
      const post = await this.prismaService.book.findUniqueOrThrow({
        where,
        include
      });
      return post;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  books = async (
    params: {
      skip?: number,
      take?: number,
      select?: Prisma.BookSelect,
      include?: Prisma.BookInclude,
      cursor?: Prisma.BookWhereUniqueInput,
      where?: Prisma.BookWhereInput,
      orderBy?: Prisma.BookOrderByWithRelationInput;
    }
  ): Promise<BookModel[] | null> => {
    const { skip, take, select, cursor, where, orderBy, include } = params;
    const books = await this.prismaService.book.findMany({
      skip,
      take,
      cursor,
      where,
      include,
      orderBy
    });
    return books;
  }

  total = async (
    params: {
      where?: Prisma.BookWhereInput
    }
  ): Promise<number> => {
    try {
      const { where } = params;
      return await this.prismaService.book.count({
        where
      });
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  getMostPopularBook = async (
    params: {
      skip?: number,
      take?: number,
    }
  ) => {
    try {
      const { skip, take } = params;
      const books = await this.prismaService.$queryRaw`
        SELECT b.id, b.title, b.description, b.images, AVG(r.rating) AS rating
        FROM "Book" b
        JOIN "Review" r ON b.id = r."bookId"
        GROUP BY b.id, b.title
        ORDER BY AVG(r.rating) DESC
        LIMIT ${take}
        OFFSET ${skip};`;
      return books;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  update = async (
    params: {
      where: Prisma.BookWhereUniqueInput,
      data: Prisma.BookUncheckedUpdateInput,
      include?: Prisma.BookInclude,
    }
  ): Promise<BookModel | null> => {
    try {
      const { where, data, include } = params;
      data.updatedAt = new Date();
      const book = await this.prismaService.book.update({
        where,
        data,
        include
      });
      return book;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }
}
