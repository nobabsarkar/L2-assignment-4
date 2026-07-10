-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "rentalRequests" ADD COLUMN     "status" "RentalStatus" NOT NULL DEFAULT 'PENDING';
