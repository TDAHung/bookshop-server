import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Review as ReviewModel } from '@prisma/client';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
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

  create = async (
    data: Prisma.ReviewUncheckedCreateInput,
  ) => {
    try {
      const review = await this.prismaService.review.create({
        data,
      });
      return review;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  delete = async (
    params: {
      where: Prisma.ReviewWhereUniqueInput,

    }
  ) => {
    try {
      const { where } = params;
      const review = await this.prismaService.review.delete({
        where,
      });
      return review;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  // avgRating = async () => {
  //   return await this.prismaService.review.groupBy({
  //     by: ['bookId'],
  //     _avg: {
  //       rating: true
  //     }
  //   });
  // }

}
