/*
  Warnings:

  - Added the required column `status` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentHistory" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "toAddress" TEXT;
