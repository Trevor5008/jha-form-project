/*
  Warnings:

  - You are about to drop the `shiftcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shiftcategory` DROP FOREIGN KEY `ShiftCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `shiftcategory` DROP FOREIGN KEY `ShiftCategory_shiftId_fkey`;

-- DropTable
DROP TABLE `shiftcategory`;

-- CreateTable
CREATE TABLE `ShiftCategoryOption` (
    `shiftId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `categoryOptionId` INTEGER NOT NULL,

    PRIMARY KEY (`shiftId`, `categoryId`, `categoryOptionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShiftCategoryOption` ADD CONSTRAINT `ShiftCategoryOption_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftCategoryOption` ADD CONSTRAINT `ShiftCategoryOption_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShiftCategoryOption` ADD CONSTRAINT `ShiftCategoryOption_categoryOptionId_fkey` FOREIGN KEY (`categoryOptionId`) REFERENCES `CategoryOption`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
