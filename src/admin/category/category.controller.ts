import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { ItemsPerPage } from 'src/global/globalPaging';

@Controller("categories")
export class AdminCategoryController {

    constructor(private readonly categoryService: AdminCategoryService) { }

    @Get()
    @Render('categories/index')
    async index(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.categories;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const categories = await this.categoryService.categories({
            take,
            skip,
            orderBy: {
                name: 'desc'
            }
        });

        const total = await this.categoryService.total();

        return {
            path: 'categories',
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
}
