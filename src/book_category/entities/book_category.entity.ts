import { ObjectType, Field } from '@nestjs/graphql';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { BookEntity } from 'src/book/entities/book.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@ObjectType()
export class BookCategoryEntity {
    @Field({ description: "ID of Relation" })
    id: number;

    @Field(() => BookEntity, { description: 'Books of Author' })
    book: BookEntity;

    @Field(() => CategoryEntity, { description: 'Authors of Book' })
    category: CategoryEntity;
}



