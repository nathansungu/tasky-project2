/*
  Warnings:

  - You are about to drop the column `isdeleted` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isdeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
