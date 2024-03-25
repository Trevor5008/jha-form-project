/*
  Warnings:

  - You are about to drop the `permit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `permit` DROP FOREIGN KEY `Permit_shiftId_fkey`;

-- DropTable
DROP TABLE `permit`;

-- CreateTable
CREATE TABLE `Personnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftPersonnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignment` VARCHAR(191) NOT NULL,
    `shiftId` INTEGER NOT NULL,
    `personnelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShiftCrew` (
    `shiftPersonnelId` INTEGER NOT NULL,
    `signatureReceived` BOOLEAN NOT NULL,

    PRIMARY KEY (`shiftPersonnelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShiftPersonnel` ADD CONSTRAINT `ShiftPersonnel_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftPersonnel` ADD CONSTRAINT `ShiftPersonnel_personnelId_fkey` FOREIGN KEY (`personnelId`) REFERENCES `Personnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftCrew` ADD CONSTRAINT `ShiftCrew_shiftPersonnelId_fkey` FOREIGN KEY (`shiftPersonnelId`) REFERENCES `ShiftPersonnel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
