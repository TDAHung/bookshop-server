import { AdminBookCategoryService } from './../book_category/book_category.service';
import { Body, Controller, Get, Param, Patch, Post, Query, Render, Res } from '@nestjs/common';
import { AdminBookService } from './book.service';
import { ItemsPerPage } from 'src/global/globalPaging';
import { Book as BookModel } from '@prisma/client';
import { AdminCategoryService } from '../category/category.service';

@Controller()
export class AdminBookController {

    constructor(
        private readonly adminBookService: AdminBookService,
        private readonly adminCategoryService: AdminCategoryService,
        private readonly adminBookCategoryService: AdminBookCategoryService
    ) { }

    @Get("books")
    @Render('books/index')
    async index(
        @Query('page') page?: string
    ) {
        const take: number | undefined = ItemsPerPage.books;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const books = await this.adminBookService.books({
            take,
            skip,
            include: {
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                categories: {
                    _count: 'desc'
                }
            }
        });

        return {
            path: 'books',
            books,
        }
    }

    @Get("books/create")
    @Render('books/create')
    async create() {
        const categories = await this.adminCategoryService.categories({
            orderBy: {
                name: 'desc'
            }
        });
        return {
            path: 'books',
            categories,
        }
    }

    @Post("books/new")
    async createBook(@Body() params: any, @Res() res) {
        if (!Array.isArray(params.categories)) {
            params.categories = params.categories.split('');
        }
        const connectCategory = params.categories.map((categoryId: string) => {
            return {
                category: {
                    connect: {
                        id: parseInt(categoryId),
                    }
                }
            }
        });
        await this.adminBookService.create({
            title: params.title,
            price: parseFloat(params.price),
            description: params.description,
            categories: {
                create: connectCategory
            }
        });
        return res.redirect("/books");
    }

    @Get("books/edit/:id")
    @Render('books/edit')
    async edit(@Param('id') id: number) {
        const book = await this.adminBookService.book({
            id: Number(id)
        }, {
            categories: true
        });

        const categories = await this.adminCategoryService.categories({
            orderBy: {
                name: 'desc'
            }
        });

        return {
            path: 'books',
            book,
            categories,
        }
    }

    @Post("books/update/:id")
    async updateBook(@Body() params: any, @Param('id') id: number, @Res() res) {
        if (!Array.isArray(params.categories)) {
            params.categories = params.categories.split('');
        }
        const connectCategory = params.categories.map((categoryId: string) => {
            return {
                category: {
                    connect: {
                        id: parseInt(categoryId),
                    }
                }
            }
        });
        await this.adminBookCategoryService.deleteManyBookCategories({
            where: {
                bookId: Number(id)
            }
        });
        const book = await this.adminBookService.update({
            where: {
                id: Number(id)
            },
            data: {
                title: params.title,
                price: parseFloat(params.price),
                quantity: Number(params.quantity),
                description: params.description,
                categories: {
                    create: connectCategory
                }
            },
        });
        return res.redirect("/books");
    }

    @Get("books/delete/:id")
    async deleteBook(@Param('id') id: string, @Res() res) {
        await this.adminBookService.delete({
            id: Number(id)
        });
        return res.redirect("/books")
    }
}
