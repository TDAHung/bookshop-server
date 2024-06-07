import { Body, Controller, Get, Param, Post, Query, Render, Req, Res, Session, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';

@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
@Controller("categories")
export class AdminCategoryController {

    constructor(private readonly categoryService: AdminCategoryService) { }
    private readonly PATH = 'categories';
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
    @Render('categories/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') searchParams?: string,
    ) {
        const search: string = searchParams || '';
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.categories;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const categories = await this.categoryService.categories({
            take,
            skip,
            where: {
                OR: [
                    {
                        name: {
                            contains: search
                        }
                    }
                ]
            },
            orderBy: {
                name: 'desc'
            }
        });
        let total = await this.categoryService.total({
            where: {
                OR: [
                    {
                        name: {
                            contains: search
                        }
                    }
                ]
            }
        });
        return this.render('index', {
            categories,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            },
            user: session.passport.user
        });
    }


    @Get("create")
    @Render('categories/create')
    async create(
        @Session() session: any,
        @Req() req: any
    ) {
        return this.render('create', {
            message: req.flash('Error')[0],
            acceptData: req.flash('Accept_Data')[0],
            user: session.passport.user
        })
    }

    @Post("new")
    async newCategory(
        @Body(new ValidationPipe()) params: CreateCategoryDTO,
        @Res() res: any) {
        try {
            await this.categoryService.create({
                name: params.name,
                description: params.description,
            });
            return res.redirect("/categories");
        } catch (error) {
            throw error;
        }
    }

    @Get("delete/:id")
    async delete(
        @Param('id') id: string,
        @Res() res: any
    ) {
        const category = await this.categoryService.delete({
            where: {
                id: Number(id)
            }
        });
        return res.redirect("/categories");
    }

    @Get("edit/:id")
    @Render('categories/edit')
    async edit(
        @Session() session: any,
        @Param('id') id: string
    ) {
        const category = await this.categoryService.category({
            id: Number(id)
        });
        return this.render('edit', {
            category,
            user: session.passport.user
        })
    }

    @Post("update/:id")
    async update(@Body(new ValidationPipe()) params: UpdateCategoryDTO, @Param('id') id: string, @Res() res) {
        await this.categoryService.update(
            {
                where: {
                    id: Number(id)
                },
                data: {
                    name: params.name,
                    description: params.description
                },
            }
        );
        return res.redirect("/categories");
    }

}
