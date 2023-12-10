/*
  Warnings:

  - Added the required column `checked` to the `CategoryOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoryoption` ADD COLUMN `checked` BOOLEAN NOT NULL;
