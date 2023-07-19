/*
  Warnings:

  - Added the required column `description` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL;
