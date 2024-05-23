import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book as BookModel, Prisma } from '@prisma/client';
import { BookEntity } from './entity/book.entity';

@Injectable()
export class AdminBookService {
    constructor(private readonly prismaService: PrismaService) { }

    book = async (
        bookWhereUniqueInput: Prisma.BookWhereUniqueInput,
        include?: Prisma.BookInclude,
    ): Promise<BookModel | null> => {
        try {
            const post = await this.prismaService.book.findUniqueOrThrow({
                where: bookWhereUniqueInput,
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
        const { skip, take, cursor, where, orderBy, include } = params;
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

    getMostPopularBook = async () => {
        try {
            const book = await this.prismaService.$queryRaw`SELECT b.id, b.title, b.images, AVG(r.rating) AS avg_rating
            FROM "Book" b
            JOIN "Review" r ON b.id = r."bookId"
            GROUP BY b.id, b.title
            ORDER BY AVG(r.rating) DESC
            LIMIT 1;
            `;
            return book[0];
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    create = async (
        data: Prisma.BookUncheckedCreateInput,
    ): Promise<BookModel | null> => {
        try {
            const book = await this.prismaService.book.create({
                data,
            });
            return book;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    delete = async (
        where: Prisma.BookWhereUniqueInput,
        include?: Prisma.BookInclude
    ): Promise<BookEntity | null> => {
        try {
            const book = await this.prismaService.book.delete({
                where,
                include
            });
            return book;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
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
