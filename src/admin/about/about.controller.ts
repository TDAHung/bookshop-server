import { Controller, Get, Render, Res, Session, UseFilters, UseGuards } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';
import * as pug from 'pug';

@Controller("about")
export class AboutController {
    @Get("synchronize")
    async getAboutPage(@Res() res: any) {
        const filePath = path.resolve(process.cwd(), 'views/about/index.pug');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file');
                return;
            }
            const html = pug.render(data);
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        });
    }

    @Get()
    @Render('about/index')
    async index(@Session() session: any) {
        return {
            user: session?.passport?.user
        }
    }
}
