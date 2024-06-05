import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BookEntity } from 'src/book/entities/book.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class OrderItemEntity {
  @Field(() => Int, { description: 'ID of Item' })
  id: number;

  @Field(() => Int, { description: "Quantity of Item" })
  quantity: number;

  @Field({ description: "Price of the Items" })
  price: number;

  @Field(() => Int, { description: "Book ID" })
  bookId: number;

  @Field(() => Int, { description: "Order ID" })
  orderId: number;

  @Field(() => BookEntity, { description: "Book of Order Item" })
  book: BookEntity;
}

type OrderStatus = "PENDING" | "COMPLETED" | "SHIPPING" | "SHIPPED" | "CANCELED";

@ObjectType()
export class OrderEntity {
  @Field(() => Int, { description: 'ID of Order' })
  id: number;

  @Field({ description: "Status of Order" })
  status: OrderStatus;

  @Field({ description: "Phone of Order" })
  phone: string;

  @Field({ description: "Total Price of Order" })
  total: number;

  @Field({ description: "First Name of Order" })
  firstName: string;

  @Field({ description: "Last Name of Order" })
  lastName: string;

  @Field(() => [OrderItemEntity], { description: "Items of Order" })
  orderItems: OrderItemEntity[];

  @Field({ description: "Address of Order" })
  address: string;

  @Field(() => UserEntity, { nullable: true, description: "Address of Order" })
  user: UserEntity;
}
