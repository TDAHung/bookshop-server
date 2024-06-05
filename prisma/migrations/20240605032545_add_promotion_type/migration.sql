/*
  Warnings:

  - You are about to drop the column `bookId` on the `Promotion` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Promotion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "promotionId" INTEGER;

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "bookId",
DROP COLUMN "type",
ADD COLUMN     "type" JSONB NOT NULL;

-- DropEnum
DROP TYPE "PromotionType";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
