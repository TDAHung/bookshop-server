import { ObjectType, Field } from '@nestjs/graphql';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { BookEntity } from 'src/book/entities/book.entity';

@ObjectType()
export class AuthorBookEntity {
    @Field({ description: "ID of Relation" })
    id: number;

    @Field(() => BookEntity, { description: 'Books of Author' })
    book: BookEntity;

    @Field(() => AuthorEntity, { description: 'Authors of Book' })
    author: AuthorEntity;
}

