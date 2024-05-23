import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Category as CategoryModel } from '@prisma/client';

@Injectable()
export class AdminCategoryService {
    constructor(private readonly prismaService: PrismaService) { }

    // destructuring = ({ id, image, user, created_at, updated_at }: PostEntity) => {
    //     const responseProduct: PostEntity = { id, image, user, created_at, updated_at };
    //     return responseProduct;
    // }

    category = async (
        categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
        include?: Prisma.CategoryInclude,
    ): Promise<CategoryModel | null> => {
        try {
            const category = await this.prismaService.category.findUniqueOrThrow({
                where: categoryWhereUniqueInput,
                include
            });
            return category;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    categories = async (
        params: {
            skip?: number,
            take?: number,
            select?: Prisma.CategorySelect,
            include?: Prisma.CategoryInclude,
            cursor?: Prisma.CategoryWhereUniqueInput,
            where?: Prisma.CategoryWhereInput,
            orderBy?: Prisma.CategoryOrderByWithRelationInput;
        }
    ): Promise<CategoryModel[] | null> => {
        const { skip, take, cursor, where, orderBy, include } = params;
        const categories = await this.prismaService.category.findMany({
            skip,
            take,
            cursor,
            where,
            include,
            orderBy
        });

        // const responsePosts = posts.map((post) => this.destructuring(post));
        return categories;
    }

    total = async (): Promise<number> => {
        try {
            return await this.prismaService.category.count();
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    create = async (
        data: Prisma.CategoryUncheckedCreateInput,
    ): Promise<CategoryModel | null> => {
        try {
            const post = await this.prismaService.category.create({
                data,
            });
            return post;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
