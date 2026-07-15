/*
  Warnings:

  - You are about to drop the column `bio` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "bio",
ADD COLUMN     "phoneNumber" TEXT;
