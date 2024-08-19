/*
  Warnings:

  - Added the required column `currency` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "currency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currency" TEXT NOT NULL;
