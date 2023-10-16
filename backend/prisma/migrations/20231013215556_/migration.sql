/*
  Warnings:

  - You are about to alter the column `date_buy` on the `Actives` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `life_util` on the `Actives` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "date_buy" DATETIME NOT NULL,
    "value_buy" TEXT NOT NULL,
    "nf" TEXT NOT NULL,
    "rate" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "life_util" DATETIME NOT NULL
);
INSERT INTO "new_Actives" ("category", "date_buy", "description", "id", "life_util", "locale", "nf", "provider", "rate", "value_buy") SELECT "category", "date_buy", "description", "id", "life_util", "locale", "nf", "provider", "rate", "value_buy" FROM "Actives";
DROP TABLE "Actives";
ALTER TABLE "new_Actives" RENAME TO "Actives";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
