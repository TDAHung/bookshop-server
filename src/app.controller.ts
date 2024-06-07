import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
    @Get("404")
    @Render("404")
    NotFound() {

    }

}
