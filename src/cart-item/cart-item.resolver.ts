import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartItemService } from './cart-item.service';
import { CartItemEntity } from './entities/cart-item.entity';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';

@Resolver(() => CartItemEntity)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) { }

  @Mutation(() => CartItemEntity)
  createCartItem(@Args('createCartItem') createCartItem: CreateCartItemInput) {
    return this.cartItemService.create({
      cartId: createCartItem.cartId,
      bookId: createCartItem.bookId,
      quantity: createCartItem.quantity,
    });
  }

  @Query(() => Boolean, { name: 'checkCartItem' })
  async isExist(
    @Args('bookId', { type: () => Int }) bookId: number,
    @Args('cartId', { type: () => Int }) cartId: number
  ) {
    try {
      const cart = await this.cartItemService.cartItem({
        where: {
          bookId,
          cartId
        }
      });
      return cart ? true : false;
    } catch (error) {

    }
  }


  // @Query(() => [CartItemEntity], { name: 'cartItem' })
  // findAll() {
  //   return this.cartItemService.findAll();
  // }

  // @Query(() => CartItemEntity, { name: 'cartItem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.cartItemService.findOne(id);
  // }

  @Mutation(() => CartItemEntity)
  async updateCartItem(@Args('updateCartItem') updateCartItem: UpdateCartItemInput) {
    return await this.cartItemService.update({
      where: {
        id: updateCartItem.id
      },
      data: {
        quantity: updateCartItem.quantity
      }
    });
  }

  @Mutation(() => CartItemEntity)
  removeCartItem(@Args('id', { type: () => Int }) id: number) {
    return this.cartItemService.remove({
      where: {
        id: id
      }
    });
  }
}
