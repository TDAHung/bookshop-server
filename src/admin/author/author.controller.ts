import { AwsService } from './../aws/aws.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Render, Req, Res, Session, UploadedFile, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { AdminAuthorService } from "./author.service";
import { ItemsPerPage } from "src/global/globalPaging";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAuthorDTO } from './dto/create-author.dto';
import { CustomExceptionFilter } from '../filter/custom-exception.filter';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { UpdateAuthorDTO } from './dto/update-author.dto';

@Controller('authors')
@UseGuards(AuthenticatedGuard)
@UseFilters(CustomExceptionFilter)
export class AdminAuthorController {
    constructor(
        private readonly adminAuthorService: AdminAuthorService,
        private readonly awsService: AwsService
    ) { }
    private readonly PATH = 'authors';
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
    @Render('authors/index')
    async index(
        @Session() session: any,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        const take: number | undefined = limit ? Number(limit) : ItemsPerPage.books;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const authors = await this.adminAuthorService.authors({
            take,
            skip,
            orderBy: {
                updatedAt: 'asc',
            }
        });

        const total = await this.adminAuthorService.total();

        return this.render('index', {
            authors,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take),
            },
            user: session.passport.user
        });
    }

    @Get('create')
    @Render('authors/create')
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
    @UseInterceptors(FileInterceptor('thumpnail'))
    async newAuthor(
        @UploadedFile() file: Express.Multer.File,
        @Body(new ValidationPipe()) params: CreateAuthorDTO,
        @Res() res: any
    ) {
        try {
            const thumpnail_json = await this.awsService.uploadFileToPublicBucket("authors", {
                file: file,
                file_name: file.originalname
            });

            const author = await this.adminAuthorService.create(
                {
                    firstName: params.firstName,
                    lastName: params.lastName,
                    bio: params.bio,
                    thumpnail: thumpnail_json,
                }
            );
            return res.redirect("/authors");
        } catch (error) {
            console.log(error);
        }
    }

    @Get('delete/:id')
    async delete(
        @Param('id') id: string,
        @Res() res: any
    ) {
        try {
            const author: any = await this.adminAuthorService.delete(Number(id));
            await this.awsService.deleteFileFromPublicBucket(author.thumpnail.key);
            return res.redirect("/authors")
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.NOT_FOUND)
        }
    }

    @Get('edit/:id')
    @Render("authors/edit")
    async edit(
        @Session() session: any,
        @Param('id') id: string,
    ) {
        try {
            const author = await this.adminAuthorService.author({
                where: {
                    id: Number(id)
                }
            });
            return this.render('edit', {
                author,
                user: session.passport.user
            })
        } catch (error) {
            throw new HttpException({ message: error }, HttpStatus.NOT_FOUND)
        }
    }

    @UseInterceptors(FileInterceptor('thumpnail'))
    @Post('update/:id')
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body(new ValidationPipe()) params: UpdateAuthorDTO,
        @Res() res: any
    ) {
        try {

            // const thumpnail_json = await this.awsService.uploadFileToPublicBucket("authors", {
            //     file: file,
            //     file_name: file.originalname
            // });

            // const author = await this.adminAuthorService.author({
            //     where: {
            //         id: Number(id),
            //         thumpnail: {
            //             path: ['name'],
            //             equals: file.originalname
            //         }
            //     }
            // });
            console.log(file);
            return res.redirect("/authors");
        } catch (error) {
            throw error;
        }
    }
}
