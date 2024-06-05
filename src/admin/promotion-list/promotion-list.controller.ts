import { ItemsPerPage } from './../../global/globalPaging';
import { CustomExceptionFilter } from './../filter/custom-exception.filter';
import { AuthenticatedGuard } from './../auth/guards/authenticated.guard';
import { Controller, UseGuards, UseFilters, Get, Render, Session, Query, Req, ValidationPipe, Body, Res, Post } from '@nestjs/common';
import { AdminPromotionListService } from './promotion-list.service';
import { CreatePromotionDTO } from './dto/create-promotion.dto';



@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
@Controller("promotions")
export class AdminPromotionListController {
    constructor(
        private readonly promotionService: AdminPromotionListService
    ) {
    }

    private readonly PATH = 'promotions';
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
    @Render('promotions/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('search') searchParams?: string
    ) {
        const search: string = searchParams || '';
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.categories;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;

        const promotions = await this.promotionService.promotions({
            take,
            skip,
            orderBy: {
                endDate: 'desc'
            }
        });
        let total = await this.promotionService.total({});
        return this.render('index', {
            promotions,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            },
            user: session.passport.user
        });
    }

    async edit() {
    }

    @Get('create')
    @Render('promotions/create')
    async create(
        @Session() session: any,
        @Req() req: any
    ) {
        return this.render('create', {
            message: req.flash('Error')[0],
            acceptData: req.flash('Accept_Data')[0],
            user: session.passport.user
        });
    }

    @Post('new')
    async newPromotion(
        @Body(new ValidationPipe()) params: CreatePromotionDTO,
        @Res() res: any
    ) {
        try {
            const toISOStringWithTimezone = (dateString) => {
                const date = new Date(dateString);
                return date.toISOString();
            };

            const startDate = toISOStringWithTimezone(params.startDate);
            const endDate = toISOStringWithTimezone(params.endDate);
            await this.promotionService.create({
                type: {
                    saleType: params.saleType,
                    saleValue: params.saleValue
                },
                startDate: startDate,
                endDate: endDate
            });
            return res.redirect("/promotions");
        } catch (error) {
            throw error;
        }
    }

    async delete() { }

}
