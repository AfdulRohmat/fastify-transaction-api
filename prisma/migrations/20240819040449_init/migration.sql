/*
  Warnings:

  - You are about to drop the column `status` on the `PaymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `toAddress` on the `PaymentHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentHistory" DROP COLUMN "status",
DROP COLUMN "toAddress";
