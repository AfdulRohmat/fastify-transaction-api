/*
  Warnings:

  - You are about to drop the column `destinationAccountId` on the `PaymentHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "destinationAccountId";
