import { AdminBookCategoryService } from './../book_category/book_category.service';
import { Body, Controller, Get, Param, Patch, Post, Query, Render, Res, Session, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminBookService } from './book.service';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AdminCategoryService } from '../category/category.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../aws/aws.service';
import { AdminAuthorService } from '../author/author.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';
import { AdminReviewService } from '../reviews/review.service';

@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
@Controller('books')
export class AdminBookController {

    constructor(
        private readonly adminBookService: AdminBookService,
        private readonly adminCategoryService: AdminCategoryService,
        private readonly adminBookCategoryService: AdminBookCategoryService,
        private readonly adminAuthorService: AdminAuthorService,
        private readonly awsService: AwsService
    ) { }
    private readonly PATH = 'books';
    private render(
        method: string,
        options: any = {}
    ) {
        return {
            path: this.PATH,
            method,
            ...options
        };
    }
    @Get()
    @Render('books/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') searchParams?: string
    ) {
        const search: string = searchParams || '';
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
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
            where: {
                OR: [
                    {
                        title: {
                            contains: search
                        }
                    }
                ]
            },
            orderBy: {
                updatedAt: 'asc',
            }
        });

        const total = await this.adminBookService.total({
            where: {
                OR: [
                    {
                        title: {
                            contains: search
                        }
                    }
                ]
            }
        });
        return this.render('index', {
            books,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            },
            user: session.passport.user
        })
    }

    @Get("create")
    @Render('books/create')
    async create(
        @Session() session: any
    ) {
        const categories = await this.adminCategoryService.categories({
            orderBy: {
                name: 'desc'
            }
        });
        const authors = await this.adminAuthorService.authors({
            orderBy: {
                firstName: 'desc'
            }
        });
        return this.render('create', {
            categories,
            authors,
            user: session.passport.user
        })
    }

    @Post("new")
    @UseInterceptors(FilesInterceptor('images'))
    async createBook(@UploadedFiles() files: Array<Express.Multer.File>, @Body() params: any, @Res() res) {
        try {
            const images = [];
            for (const file of files) {
                const url = await this.awsService.uploadFileToPublicBucket("books", {
                    file: file,
                    file_name: file.originalname
                });
                images.push(url);
            }

            let categories = params.categories ?? null;
            let authors = params.authors ?? null;
            let connectCategories: any = undefined;
            let connectAuthor: any = undefined;
            if (categories) {
                if (!Array.isArray(categories)) {
                    categories = categories.split('');
                }
                connectCategories = {
                    create: categories.map((categoryId: string) => {
                        return {
                            category: {
                                connect: {
                                    id: parseInt(categoryId),
                                }
                            }
                        }
                    })
                };

            }
            if (authors) {
                if (!Array.isArray(authors)) {
                    authors = authors.split('');
                }
                connectAuthor = {
                    create: authors.map((authorId: string) => {
                        return {
                            author: {
                                connect: {
                                    id: parseInt(authorId)
                                }
                            }
                        }
                    })
                };
            }
            await this.adminBookService.create({
                title: params.title,
                price: parseFloat(params.price),
                description: params.description,
                categories: connectCategories,
                authors: connectAuthor,
                images
            });
            return res.redirect("/books");
        } catch (error) {
            console.log(error);
        }
    }

    @Get("show/:id")
    @Render('books/show')
    async show(
        @Session() session: any,
        @Param('id') id: string
    ) {
        try {
            const book = await this.adminBookService.book({
                id: Number(id)
            }, {
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                                description: true,
                            }
                        }
                    }
                },
                authors: {
                    select: {
                        author: {
                            select: {
                                firstName: true,
                                lastName: true,
                                thumpnail: true,
                            }
                        }
                    }
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                username: true,
                            }
                        },
                    }
                }
            });
            return this.render('show', {
                book,
                user: session.passport.user
            })
        } catch (error) {
            throw error;
        }
    }

    @Get("edit/:id")
    @Render('books/edit')
    async edit(
        @Session() session: any,
        @Param('id') id: string
    ) {
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

        return this.render('edit', {
            book,
            categories,
            user: session.passport.user
        })
    }

    @Post("update/:id")
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
                },
            },
        });
        return res.redirect("/books");
    }

    @Get("delete/:id")
    async deleteBook(@Param('id') id: string, @Res() res) {
        const book = await this.adminBookService.delete({
            id: Number(id)
        });
        if (book.images) {
            book.images.forEach((image: any) => {
                this.awsService.deleteFileFromPublicBucket(image.key);
            });
        }
        return res.redirect("/books")
    }
}
