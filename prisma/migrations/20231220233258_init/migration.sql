-- CreateTable
CREATE TABLE `MiscOption` (
    `shiftId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `details` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`shiftId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MiscOption` ADD CONSTRAINT `MiscOption_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MiscOption` ADD CONSTRAINT `MiscOption_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
