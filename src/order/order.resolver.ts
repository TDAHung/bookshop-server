import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @Mutation(() => OrderEntity)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [OrderEntity], { name: 'orders' })
  async findAll(
    @Args('userID', { type: () => Int, nullable: true }) userID: number
  ) {
    return await this.orderService.orders({
      where: {
        userId: userID
      },
      include: {
        orderItems: true
      }
    });
  }

  @Query(() => OrderEntity, { name: 'order' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.orderService.order({
      where: {
        id: id,
      }
    });
  }

  // @Mutation(() => OrderEntity)
  // updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //   return this.orderService.update(updateOrderInput.id, updateOrderInput);
  // }

  // @Mutation(() => OrderEntity)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderService.remove(id);
  // }
}
