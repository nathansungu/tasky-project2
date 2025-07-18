/*
  Warnings:

  - Added the required column `description` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "description" TEXT NOT NULL;
