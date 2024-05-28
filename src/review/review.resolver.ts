import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';

@Resolver(() => ReviewEntity)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) { }

  @Mutation(() => ReviewEntity)
  async createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput) {
    return await this.reviewService.create({
      rating: createReviewInput.rating,
      comment: createReviewInput.comment,
      userId: createReviewInput.userId,
      bookId: createReviewInput.bookId
    });
  }

  @Query(() => [ReviewEntity], { name: 'reviews' })
  async findAll(
    @Args('bookId', { type: () => Int }) id: number
  ) {
    const reviews = await this.reviewService.reviews({
      where: {
        bookId: Number(id)
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });
    return reviews;
  }


  @Mutation(() => ReviewEntity)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.delete({
      where: {
        id: Number(id)
      }
    });
  }
}
