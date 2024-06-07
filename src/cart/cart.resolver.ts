import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) { }

  @Mutation(() => Cart)
  createCart(@Args('createCart') createCartInput: CreateCartInput) {
    return this.cartService.create({
      userId: createCartInput.userId
    });
  }

  @Query(() => Boolean, { name: 'checkCart' })
  async checkCart(@Args('id', { nullable: true, type: () => Int }) id: number) {
    try {
      const cart = await this.cartService.cart({
        where: {
          userId: id
        }
      });
      return cart ? true : false;
    } catch (error) {

    }
  }

  @Query(() => Cart, { name: 'cart' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      const cart = await this.cartService.cart({
        where: {
          userId: id
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
            }
          },
          cartItems: {
            include: {
              book: {
                include: {
                  promotion: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
        }
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Cart)
  async removeCart(@Args('id', { type: () => Int }) id: number) {
    return await this.cartService.remove({
      where: {
        userId: id
      }
    });
  }
}
