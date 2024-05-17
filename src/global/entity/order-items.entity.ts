import { $Enums, Book, OrderItem, User } from "@prisma/client";

export class OrderItemsEntity {
    id: number;
    quantity: number;
    price: number;
    bookId: number;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
    book?: Book | null;
}
