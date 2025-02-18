/*
  Warnings:

  - You are about to drop the `Something` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Something";
