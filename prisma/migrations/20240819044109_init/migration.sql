/*
  Warnings:

  - You are about to drop the column `toAddress` on the `PaymentHistory` table. All the data in the column will be lost.
  - Added the required column `destinationAccountId` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "toAddress",
ADD COLUMN     "destinationAccountId" INTEGER NOT NULL,
ADD COLUMN     "notes" TEXT;
