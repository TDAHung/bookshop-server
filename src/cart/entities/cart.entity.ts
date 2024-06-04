import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CartItemEntity } from 'src/cart-item/entities/cart-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class Cart {
  @Field({ description: "ID of Cart" })
  id: number;

  @Field({ description: "ID of User" })
  userId: number;

  @Field({ description: "User" })
  user: UserEntity

  @Field(() => [CartItemEntity], { description: "Cart Items" })
  cartItems: CartItemEntity[];
}
