import { AwsService } from './../aws/aws.service';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Render, Res, UploadedFile, UseFilters, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { AdminAuthorService } from "./author.service";
import { ItemsPerPage } from "src/global/globalPaging";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAuthorDTO } from './dto/create-author.dto';
import { AuthExceptionFilter } from '../auth/filter/auth-exception.filter';

@Controller('authors')
@UseFilters(AuthExceptionFilter)
export class AdminAuthorController {
    constructor(
        private readonly adminAuthorService: AdminAuthorService,
        private readonly awsService: AwsService
    ) { }

    @Get()
    @Render('authors/index')
    async index(
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

        return {
            path: 'authors',
            authors,
            paging: {
                total,
                page: Number(page),
                totalPages: total % take != 0 ? Math.floor(total / take) + 1 : Math.floor(total / take)
            }
        }
    }

    @Get('create')
    @Render('authors/create')
    create() {
        return {
            path: 'authors',
        }
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
}
