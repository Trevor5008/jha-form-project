/*
  Warnings:

  - Added the required column `foreman` to the `Shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shift` ADD COLUMN `foreman` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `supervisor` VARCHAR(191) NOT NULL;
