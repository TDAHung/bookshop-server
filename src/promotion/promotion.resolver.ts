import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromotionService } from './promotion.service';
import { PromotionEntity } from './entities/promotion.entity';
import { PromotionSortBy } from './dto/promotion-query.dto';

@Resolver(() => PromotionEntity)
export class PromotionResolver {
  constructor(private readonly promotionService: PromotionService) { }

  @Query(() => [PromotionEntity], { name: 'promotions' })
  async findAll(
    @Args('limit', { nullable: true }) limit?: number,
    @Args('sortBy', { nullable: true, type: () => [PromotionSortBy] }) sortByParams?: Array<PromotionSortBy>,
  ) {

    const { sortByReview } = this.promotionService.orderBy({
      sortByParams
    });

    const promotions = await this.promotionService.promotions({
      include: {
        books: {
          take: limit,
          include: {
            reviews: {
              select: {
                rating: true
              }
            },
            promotion: true
          }
        }
      }
    });
    promotions.forEach(data => {
      data.books.forEach(book => {
        // @ts-ignore
        if (book.reviews.length > 0) {
          // @ts-ignore
          let sum = book.reviews.reduce((acc, review) => acc + review.rating, 0);
          // @ts-ignore
          let avgRating = sum / book.reviews.length;
          // @ts-ignore
          book.avgRating = avgRating;
        } else {
          // @ts-ignore
          book.avgRating = 0;
        }
      });
      if (sortByReview.reviews === "asc") {
        // @ts-ignore
        data.books.sort((a, b) => a.avgRating - b.avgRating)
      }
      else if (sortByReview.reviews === "desc") {
        // @ts-ignore
        data.books.sort((a, b) => b.avgRating - a.avgRating)
      }
    });


    return promotions;
  }

  @Query(() => PromotionEntity, { name: 'promotion' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.promotionService.promotion({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
