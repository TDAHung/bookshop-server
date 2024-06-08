import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { CartService } from 'src/cart/cart.service';
import { BookService } from 'src/book/book.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
    private readonly bookService: BookService,
  ) { }

  @Mutation(() => OrderEntity)
  async createOrder(@Args('createOrder') createOrder: CreateOrderInput) {
    try {
      // const connectOrderItems = {
      //   create: createOrder.orderItems.map((orderItems) => {
      //     return {
      //       quantity: orderItems.quantity,
      //       price: orderItems.price,
      //       bookId: orderItems.bookId
      //     }
      //   })
      // };
      // if (createOrder.userId) {
      //   await this.cartService.remove({
      //     where: {
      //       userId: createOrder.userId
      //     }
      //   });
      // }

      const connectOrder = [];
      createOrder.orderItems.forEach(async (orderItem) => {
        connectOrder.push({
          quantity: orderItem.quantity,
          price: orderItem.price,
          bookId: orderItem.bookId
        })
        const book = await this.bookService.book({
          where: {
            id: orderItem.bookId
          }
        })
        await this.bookService.update({
          where: {
            id: orderItem.bookId
          },
          data: {
            quantity: (book.quantity - orderItem.quantity)
          }
        });
      });

      const order = await this.orderService.create({
        address: createOrder.address,
        lastName: createOrder.lastName,
        firstName: createOrder.firstName,
        total: createOrder.total,
        phone: createOrder.phone,
        email: createOrder.email,
        orderItems: {
          create: connectOrder
        },
        status: 'PENDING',
        userId: createOrder.userId
      });
      return order
    } catch (error) {
      throw error;
    }
  }

  @Query(() => [OrderEntity], { name: 'orders' })
  async findAll(
    @Args('userID', { type: () => Int, nullable: true }) userID: number
  ) {
    const orders = await this.orderService.orders({
      where: {
        userId: userID
      },
      include: {
        orderItems: {
          include: {
            book: true
          }
        }
      }
    });
    return orders;
  }

  @Query(() => OrderEntity, { name: 'order' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.orderService.order({
      where: {
        id: id,
      },
      include: {
        orderItems: {
          include: {
            book: {
              include: {
                promotion: true
              }
            }
          }
        }
      }
    });
  }
}
