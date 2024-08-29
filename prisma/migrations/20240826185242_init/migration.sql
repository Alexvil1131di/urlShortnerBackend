/*
  Warnings:

  - A unique constraint covering the columns `[userId,longUrl]` on the table `UserUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserUrl_longUrl_key` ON `UserUrl`;

-- CreateIndex
CREATE UNIQUE INDEX `UserUrl_userId_longUrl_key` ON `UserUrl`(`userId`, `longUrl`);
