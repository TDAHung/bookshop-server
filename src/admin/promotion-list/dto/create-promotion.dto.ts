import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreatePromotionDTO {
    // @IsString()
    // @IsNotEmpty()
    // @MinLength(6)
    // name: string;

    // @IsString()
    // @IsNotEmpty()
    // description: string;
    @IsNotEmpty()
    saleType: string;

    @IsNotEmpty()
    saleValue: string;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;
}
