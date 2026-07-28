-- AlterTable: add unique constraint on MenuItem.name
CREATE UNIQUE INDEX "MenuItem_name_key" ON "MenuItem"("name");
