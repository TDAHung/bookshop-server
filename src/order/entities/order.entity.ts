import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class OrderItemEntity {
  @Field(() => Int, { description: 'ID of Item' })
  id: number;

  @Field(() => Int, { description: "Quantity of Item" })
  quantity: number;

  @Field(() => Int, { description: "Price of the Items" })
  price: number;

  @Field(() => Int, { description: "Book ID" })
  bookId: number;

  @Field(() => Int, { description: "Order ID" })
  orderId: number;
}

type OrderStatus = "PENDING" | "COMPLETED" | "SHIPPING" | "SHIPPED" | "CANCELED";

@ObjectType()
export class OrderEntity {
  @Field(() => Int, { description: 'ID of Order' })
  id: number;

  @Field({ description: "Status of Order" })
  status: OrderStatus;

  @Field(() => [OrderItemEntity], { description: "Items of Order" })
  orderItems: OrderItemEntity[];

  @Field({ description: "Address of Order" })
  address: string;

  @Field(() => UserEntity, { nullable: true, description: "Address of Order" })
  user: UserEntity;
}
