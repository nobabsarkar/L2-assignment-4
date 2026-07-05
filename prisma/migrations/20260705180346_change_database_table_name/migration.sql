/*
  Warnings:

  - You are about to drop the `Tanant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tanant";

-- CreateTable
CREATE TABLE "tanants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tanants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tanants_email_key" ON "tanants"("email");
