import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { AdminCategoryService } from './category.service';
import { ItemsPerPage } from 'src/global/globalPaging';

@Controller()
export class AdminCategoryController {

    constructor(private readonly categoryService: AdminCategoryService) { }

    @Get("categories")
    @Render('categories/index')
    async index(
        @Query('page') page?: string
    ) {
        const take: number | undefined = ItemsPerPage.categories;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const categories = await this.categoryService.categories({
            take,
            skip,
            orderBy: {
                name: 'desc'
            }
        });

        return {
            path: 'categories',
            categories,
        }
    }

    @Get("categories/create")
    @Render('categories/create')
    async create() {
        return {
            path: 'categories',
        }
    }

    @Post("categories/new")
    async newCategory(@Body() params: any, @Res() res) {
        await this.categoryService.create({
            name: params.name,
            description: params.description,
        });
        return res.redirect("/categories");
    }
}
