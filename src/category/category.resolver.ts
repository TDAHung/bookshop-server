import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { ItemsPerPage } from 'src/global/globalPaging';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @Query(() => [CategoryEntity], { name: 'categories' })
  async findAll(
    @Args('page', { nullable: true }) page?: number,
    @Args('limit', { nullable: true }) limit?: number,
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
      const take: number | undefined = limit ? Number(limit) : ItemsPerPage.categories;
      const skip: number | undefined = page ? (Number(page) - 1) * take : 0;

      return await this.categoryService.categories({
        take,
        skip,
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.category(
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
  }
}
