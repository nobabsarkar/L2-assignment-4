/*
  Warnings:

  - The primary key for the `rentalRequests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "rentalRequests" DROP CONSTRAINT "rentalRequests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rentalRequests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rentalRequests_id_seq";
