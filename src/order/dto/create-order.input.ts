import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderItemsConnect {
  @Field({ description: "Quantity of books" })
  quantity: number;

  @Field({ description: "Price of books" })
  price: number;

  @Field({ description: "ID of book" })
  bookId: number;
}

@InputType()
export class CreateOrderInput {
  @Field({ description: "quantity of books" })
  quantity: number;

  @Field({ description: "price of total books" })
  total: number;

  @Field({ description: "address of order" })
  address: string;

  @Field({ description: "phone of order" })
  phone: string;

  @Field({ description: "First Name of order user" })
  firstName: string;

  @Field({ description: "Last Name of order user" })
  lastName: string;

  @Field({ description: "Email of order user" })
  email: string;

  @Field({ nullable: true, description: "User ID" })
  userId: number;

  @Field(() => [OrderItemsConnect], { description: "Order Items of order user" })
  orderItems: OrderItemsConnect[];
}
