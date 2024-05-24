import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Category as CategoryModel } from '@prisma/client';

@Injectable()
export class AdminCategoryService {
    constructor(private readonly prismaService: PrismaService) { }
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
        return categories;
    }

    total = async (
        params: { where?: Prisma.CategoryWhereInput, }
    ): Promise<number> => {
        try {
            const { where } = params;
            return await this.prismaService.category.count({
                where
            });
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    create = async (
        data: Prisma.CategoryUncheckedCreateInput,
    ): Promise<CategoryModel | null> => {
        try {
            const category = await this.prismaService.category.create({
                data,
            });
            return category;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    delete = async (
        params: {
            where: Prisma.CategoryWhereUniqueInput
        }
    ) => {
        try {
            const { where } = params;
            return await this.prismaService.category.delete({
                where
            });
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    update = async (
        params: {
            where: Prisma.CategoryWhereUniqueInput,
            data: Prisma.CategoryUncheckedUpdateInput,
            include?: Prisma.CategoryInclude,
        }
    ): Promise<CategoryModel | null> => {
        try {
            const { where, data, include } = params;
            data.updatedAt = new Date();
            const category = await this.prismaService.category.update({
                where,
                data,
                include
            });
            return category;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }
}
