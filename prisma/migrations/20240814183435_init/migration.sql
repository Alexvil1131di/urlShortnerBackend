/*
  Warnings:

  - Added the required column `updateAt` to the `UserUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserUrl" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
