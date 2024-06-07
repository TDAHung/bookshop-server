import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { CartService } from 'src/cart/cart.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) { }

  @Mutation(() => OrderEntity)
  async createOrder(@Args('createOrder') createOrder: CreateOrderInput) {
    try {
      const connectOrderItems = {
        create: createOrder.orderItems.map((orderItems) => {
          return {
            quantity: orderItems.quantity,
            price: orderItems.price,
            bookId: orderItems.bookId
          }
        })
      };
      if (createOrder.userId) {
        await this.cartService.remove({
          where: {
            userId: createOrder.userId
          }
        });
      }

      return await this.orderService.create({
        address: createOrder.address,
        lastName: createOrder.lastName,
        firstName: createOrder.firstName,
        total: createOrder.total,
        phone: createOrder.phone,
        email: createOrder.email,
        orderItems: connectOrderItems,
        status: 'PENDING',
        userId: createOrder.userId
      });
    } catch (error) {

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
