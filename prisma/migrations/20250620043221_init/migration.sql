-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "gifURL" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
