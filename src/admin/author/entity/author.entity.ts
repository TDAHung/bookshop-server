import { Prisma } from "@prisma/client";

export class AuthorEntity {
    firstName: string;

    lastName: string;

    bio: string;

    thumpnail?: Prisma.JsonValue;

    createdAt: Date;

    updatedAt: Date;
}
