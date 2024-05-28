import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

export interface ImageJson {
    url: string,
    key: string,
    name: string,
    size: number
}

export class BookEntity {
    id: number;

    title: string;

    price: number;

    discount?: number;

    images?: ImageJson[] | JsonValue[];

    createdAt?: Date;

    updatedAt?: Date
};
