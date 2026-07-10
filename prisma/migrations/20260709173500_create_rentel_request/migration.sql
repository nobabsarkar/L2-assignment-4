/*
  Warnings:

  - You are about to drop the `tanants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tanants";

-- CreateTable
CREATE TABLE "rentalRequests" (
    "id" SERIAL NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "rentalRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rentalRequests" ADD CONSTRAINT "rentalRequests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalRequests" ADD CONSTRAINT "rentalRequests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
