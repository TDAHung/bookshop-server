import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field({ description: "content" })
  content: string;

  @Field(() => Int, { nullable: true, description: 'ID sender' })
  senderId: number;

  @Field(() => Int, { nullable: true, description: 'ID receiver' })
  receiverId: number;

  @Field({ nullable: true, description: 'created at' })
  createdAt: Date;
}
