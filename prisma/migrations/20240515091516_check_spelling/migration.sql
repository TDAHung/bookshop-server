/*
  Warnings:

  - You are about to drop the column `updateddAt` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `onSale` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Promotion` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "onSale",
DROP COLUMN "updateddAt",
ADD COLUMN     "on_sale" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
