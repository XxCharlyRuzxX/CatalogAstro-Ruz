-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "idProduct" TEXT NOT NULL PRIMARY KEY,
    "nameProduct" TEXT NOT NULL,
    "imgProduct" TEXT NOT NULL,
    "priceProduct" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_products" ("brand", "description", "idProduct", "imgProduct", "nameProduct", "priceProduct") SELECT "brand", "description", "idProduct", "imgProduct", "nameProduct", "priceProduct" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
