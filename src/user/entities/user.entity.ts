import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
};
