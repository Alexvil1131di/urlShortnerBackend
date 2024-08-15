/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `UserUrl` table. All the data in the column will be lost.
  - Added the required column `key` to the `UserUrl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserUrl" DROP COLUMN "shortUrl",
ADD COLUMN     "key" TEXT NOT NULL;
