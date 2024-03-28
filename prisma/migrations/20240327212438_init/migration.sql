/*
  Warnings:

  - The primary key for the `shiftcrew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `shiftpersonnel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `shiftcrew` DROP FOREIGN KEY `ShiftCrew_shiftPersonnelId_fkey`;

-- AlterTable
ALTER TABLE `shiftcrew` DROP PRIMARY KEY,
    MODIFY `shiftPersonnelId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`shiftPersonnelId`);

-- AlterTable
ALTER TABLE `shiftpersonnel` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ShiftCrew` ADD CONSTRAINT `ShiftCrew_shiftPersonnelId_fkey` FOREIGN KEY (`shiftPersonnelId`) REFERENCES `ShiftPersonnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
