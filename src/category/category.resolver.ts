import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @Query(() => [CategoryEntity], { name: 'categories' })
  async findAll(
    @Args('search', { nullable: true }) searchParams?: string,
    @Args('sortBy', { nullable: true }) sortByParams?: string,
    @Args('order', { nullable: true }) orderParams?: string,
  ) {
    {
      const search: string = searchParams || '';
      const order: string = orderParams || '';
      const sortBy: {} = sortByParams ? {
        [sortByParams]: order
      } : undefined;
      return await this.categoryService.categories({
        include: {
          books: {
            include: {
              book: true
            }
          }
        },
        where: {
          OR: [
            {
              name: {
                contains: search
              }
            }
          ]
        },
        orderBy: sortBy
      });
    }
  }

  @Query(() => CategoryEntity, { name: 'category' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const category = await this.categoryService.category(
      {
        where: {
          id: Number(id)
        },
        include: {
          books: {
            include: {
              book: true
            }
          }
        }
      }
    );
    return category
  }
}
