import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
