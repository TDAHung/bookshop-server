import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignOutResponse {
    @Field()
    SignOutStatus: boolean;
}
