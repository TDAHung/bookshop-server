import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
