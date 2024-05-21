import { IsString } from "class-validator";


export class CreateAuthorDTO {
    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsString()
    bio: string;
}
