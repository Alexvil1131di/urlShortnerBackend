/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `UserUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserUrl_shortUrl_key" ON "UserUrl"("shortUrl");
