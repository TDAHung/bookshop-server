import { IsNotEmpty, IsString } from "class-validator";


export class UpdateAuthorDTO {
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    bio: string;
}
