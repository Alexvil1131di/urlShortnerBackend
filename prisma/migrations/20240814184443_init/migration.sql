/*
  Warnings:

  - A unique constraint covering the columns `[longUrl]` on the table `UserUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserUrl_shortUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_longUrl_key" ON "UserUrl"("longUrl");
