-- AlterTable: add optional real photo URL for menu items (falls back to emoji+gradient when null)
ALTER TABLE "MenuItem" ADD COLUMN "imageUrl" TEXT;
