-- CreateTable
CREATE TABLE "Actives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "date_buy" DATETIME NOT NULL,
    "value_buy" DECIMAL NOT NULL,
    "nf" TEXT NOT NULL,
    "rate" DECIMAL NOT NULL,
    "description" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "life_util" DATETIME NOT NULL
);
