import { Controller, Get } from '@nestjs/common';

@Controller()
export class AdminOrderController {

    @Get("orders")
    getAllOrders() {
        return {
            "message": "OK"
        }
    }
}
