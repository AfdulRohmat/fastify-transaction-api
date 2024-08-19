/*
  Warnings:

  - You are about to drop the column `nextPaymentDate` on the `RecurringPayment` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `RecurringPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecurringPayment" DROP COLUMN "nextPaymentDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
