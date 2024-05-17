import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BookCategory as BookCategoryModel } from '@prisma/client';

@Injectable()
export class AdminBookCategoryService {
    constructor(private readonly prismaService: PrismaService) { }
    deleteManyBookCategories = async (
        params: {
            where?: Prisma.BookCategoryWhereInput
        }
    ): Promise<void> => {
        const { where } = params;
        await this.prismaService.bookCategory.deleteMany({
            where,
        });
    }
}
