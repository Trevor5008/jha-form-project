/*
  Warnings:

  - You are about to drop the column `checked` on the `categoryoption` table. All the data in the column will be lost.
  - Added the required column `checked` to the `ShiftCategoryOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoryoption` DROP COLUMN `checked`;

-- AlterTable
ALTER TABLE `shiftcategoryoption` ADD COLUMN `checked` BOOLEAN NOT NULL;
