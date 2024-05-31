import { ArgsType, Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SortBy {
    @Field({ description: "sort by field" })
    field: string;

    @Field({ description: "Order by asc or desc" })
    order: string;
}

@InputType()
export class FilterBy {
    @Field({ description: "filter by field" })
    field: string;

    @Field(() => [Float], { description: "Value of the Filter field" })
    in: number[];
}

@InputType()
export class SearchBy {
    @Field({ description: "Search by field" })
    field: string;

    @Field({ description: "Value of the Filter field" })
    contains: string;
}
