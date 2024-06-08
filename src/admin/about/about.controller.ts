import { Controller, Get, Render, Res, Session } from "@nestjs/common";
import * as path from "path";
import * as fs from 'fs';
import * as pug from 'pug';

@Controller("about")
export class AboutController {
    @Get("synchronize")
    async getAboutPage(@Res() res: any) {
        try {
            const filePath = path.resolve(process.cwd(), 'views/about/index.pug');

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send('Error reading file');
                    return;
                }
                const html = pug.render(data, { filename: filePath });
                const className = "about";
                const regex = new RegExp(`<main[^>]*class\\s*=\\s*["'][^"']*\\b${className}\\b[^"']*["'][^>]*>(.*?)<\\/main>`, "is");
                const match = html.match(regex);
                if (match && match.length > 0) {
                    res.setHeader('Content-Type', 'text/html');
                    res.send(match[0]);
                } else {
                    res.status(404).send('Content not found');
                }
            });
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    }

    @Get()
    @Render('about/index')
    async index(@Session() session: any) {
        return {
            path: 'about',
            user: session?.passport?.user
        }
    }
}
