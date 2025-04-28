/*
  Warnings:

  - A unique constraint covering the columns `[lineUid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `lineUid` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lineUid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_lineUid_key" ON "User"("lineUid");
