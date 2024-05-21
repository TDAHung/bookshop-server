import { AwsService } from './../aws/aws.service';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Render, Res, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { AdminAuthorService } from "./author.service";
import { ItemsPerPage } from "src/global/globalPaging";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAuthorDTO } from './dto/create-author.dto';
import { AuthorEntity } from './entity/author.entity';

@Controller('authors')
export class AdminAuthorController {
    constructor(
        private readonly adminAuthorService: AdminAuthorService,
        private readonly awsService: AwsService
    ) { }

    @Get()
    @Render('authors/index')
    async index(
        @Query('page') page?: string
    ) {
        const take: number | undefined = ItemsPerPage.books;
        const skip: number | undefined = page ? (Number(page) - 1) * take : 0;
        const authors = await this.adminAuthorService.authors({
            take,
            skip,
            orderBy: {
                updatedAt: 'asc',
            }
        });

        return {
            path: 'authors',
            authors,
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
    @UseInterceptors(FileInterceptor('thumpnail'))
    async delete(
        @Query('id') id: string,
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
