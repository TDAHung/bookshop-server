import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PromotionSortBy {
    @Field({ description: "sort by field" })
    field: string;

    @Field({ description: "Order by asc or desc" })
    order: string;
}
