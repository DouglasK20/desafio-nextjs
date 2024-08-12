-- DropForeignKey
ALTER TABLE `licenca` DROP FOREIGN KEY `Licenca_empresaId_fkey`;

-- AddForeignKey
ALTER TABLE `Licenca` ADD CONSTRAINT `Licenca_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
