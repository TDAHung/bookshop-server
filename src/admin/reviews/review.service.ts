import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Review as ReviewModel } from '@prisma/client';

@Injectable()
export class AdminReviewService {
    constructor(private readonly prismaService: PrismaService) { }

    review = async (
        reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput,
        include?: Prisma.ReviewInclude,
    ): Promise<ReviewModel | null> => {
        try {
            const review = await this.prismaService.review.findUniqueOrThrow({
                where: reviewWhereUniqueInput,
                include
            });
            return review;
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    reviews = async (
        params: {
            skip?: number,
            take?: number,
            select?: Prisma.ReviewSelect,
            include?: Prisma.ReviewInclude,
            cursor?: Prisma.ReviewWhereUniqueInput,
            where?: Prisma.ReviewWhereInput,
            orderBy?: Prisma.ReviewOrderByWithRelationInput;
        }
    ): Promise<ReviewModel[] | null> => {
        const { skip, take, cursor, where, orderBy, include } = params;
        const reviews = await this.prismaService.review.findMany({
            skip,
            take,
            cursor,
            where,
            include,
            orderBy
        });
        // const responsePosts = posts.map((post) => this.destructuring(post));
        return reviews;
    }

    total = async (): Promise<number> => {
        try {
            return await this.prismaService.review.count();
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

    avgStar = async (): Promise<number> => {
        try {
            const avgStar = await this.prismaService.$queryRaw`
            select AVG(r.rating) AS avg_rating
            from "Review" r;`;
            return Number(parseFloat(avgStar[0].avg_rating).toFixed(2));
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
        }
    }

}
