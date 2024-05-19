import { $Enums, OrderItem, User } from "@prisma/client";
import { OrderItemsEntity } from "./order-items.entity";

export class OrderEntity {
    id: number;
    status: $Enums.OrderStatus;
    total: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    user?: User | null;
    orderItems?: OrderItemsEntity[] | null;
}
