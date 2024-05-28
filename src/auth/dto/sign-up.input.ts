import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignUpInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    username: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    lastName: string;
}
