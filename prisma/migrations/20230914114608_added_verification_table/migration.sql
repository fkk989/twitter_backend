/*
  Warnings:

  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyEmailToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPasswordToken",
DROP COLUMN "verifyEmailToken";

-- CreateTable
CREATE TABLE "Verification" (
    "email" TEXT NOT NULL,
    "verifyEmailToken" INTEGER,
    "forgotPasswordToken" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_key" ON "Verification"("email");
