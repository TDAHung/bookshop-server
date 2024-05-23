import { Controller, Get, Post, Render, Req, Res, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';
import { AuthExceptionFilter } from './filter/auth-exception.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AdminAuthController {
    constructor() { }

    @Get("/login")
    @Render("auths/login")
    renderPage(@Req() req): { message: string } {
        return {
            message: req.flash('Error')
        }
    }

    @Post("/login/new")
    @UseGuards(LoginGuard)
    async newSession(
        @Res() res: any
    ) {
        res.redirect('/');
    }


    @Get('/logout')
    logout(@Req() req: any, @Res() res: any) {
        req.logout(() => {
            res.redirect('/login');
        });
    }
}
