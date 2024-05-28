import { IsNotEmpty, IsString } from "class-validator";


export class CreateAuthorDTO {
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
