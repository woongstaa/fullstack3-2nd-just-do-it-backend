-- CreateTable
CREATE TABLE `snkrs_with_sizes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `style_code` VARCHAR(191) NOT NULL,
    `product_size_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `snkrs_with_sizes` ADD CONSTRAINT `snkrs_with_sizes_product_size_id_fkey` FOREIGN KEY (`product_size_id`) REFERENCES `product_sizes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `snkrs_with_sizes` ADD CONSTRAINT `snkrs_with_sizes_style_code_fkey` FOREIGN KEY (`style_code`) REFERENCES `snkrs`(`style_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
