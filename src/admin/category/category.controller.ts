import { Body, Controller, Get, Param, Post, Query, Render, Req, Res, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { ItemsPerPage } from 'src/global/globalPaging';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { AuthExceptionFilter } from '../auth/filter/auth-exception.filter';
import { UpdateCategoryDTO } from './dto/update-category.dto';

// @UseGuards(AuthenticatedGuard)
// @UseFilters(AuthExceptionFilter)
@Controller("categories")
export class AdminCategoryController {

    constructor(private readonly categoryService: AdminCategoryService) { }

    @Get()
    @Render('categories/index')
    async index(
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

        return {
            path: 'categories',
            method: 'index',
            categories,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            }
        }
    }

    @Get("create")
    @Render('categories/create')
    async create() {
        return {
            path: 'categories',
        }
    }

    @Post("new")
    async newCategory(@Body() params: any, @Res() res) {
        await this.categoryService.create({
            name: params.name,
            description: params.description,
        });
        return res.redirect("/categories");
    }

    @Get("delete/:id")
    async delete(
        @Param('id') id: string,
        @Res() res
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
        @Param('id') id: string
    ) {
        const category = await this.categoryService.category({
            id: Number(id)
        });
        return {
            path: 'categories',
            method: 'edit',
            category
        }
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
