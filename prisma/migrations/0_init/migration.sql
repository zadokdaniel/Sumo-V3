-- CreateTable
CREATE TABLE "Shift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "timePeriod" TEXT NOT NULL,
    "netTips" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shiftId" TEXT NOT NULL,
    "intervals" INTEGER NOT NULL DEFAULT 15,
    "multiplierValue" REAL NOT NULL DEFAULT 1.0,
    "multiplierEnabled" BOOLEAN NOT NULL DEFAULT false,
    "provisionValue" REAL NOT NULL DEFAULT 0.05,
    "provisionThreshold" REAL NOT NULL DEFAULT 40,
    "provisionEnabled" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Rules_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shiftId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "breaks" INTEGER,
    "expenses" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Staff_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rules_shiftId_key" ON "Rules"("shiftId");

-- CreateIndex
CREATE INDEX "Staff_shiftId_idx" ON "Staff"("shiftId");