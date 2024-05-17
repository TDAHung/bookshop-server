import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book as BookModel, Prisma } from '@prisma/client';

@Injectable()
export class AdminBookService {
    constructor(private readonly prismaService: PrismaService) { }

    // destructuring = ({ id, image, user, created_at, updated_at }: PostEntity) => {
    //     const responseProduct: PostEntity = { id, image, user, created_at, updated_at };
    //     return responseProduct;
    // }

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

        // const responsePosts = posts.map((post) => this.destructuring(post));
        return books;
    }

    create = async (
        data: Prisma.BookUncheckedCreateInput,
    ): Promise<BookModel | null> => {
        try {
            const post = await this.prismaService.book.create({
                data,
            });
            return post;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    delete = async (
        where: Prisma.BookWhereUniqueInput,
        include?: Prisma.BookInclude
    ): Promise<BookModel | null> => {
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
