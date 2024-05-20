-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'SHIPPING';

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "quantity" SET DEFAULT 1;
