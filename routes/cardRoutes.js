import express from 'express';
import { PrismaClient } from "../src/generated/prisma/index.js";
const cardRoutes = express.Router();

const prisma = new PrismaClient();

cardRoutes.get("/", async (req, res) => {
  const cards = await prisma.card.findMany();
  res.json(cards);
});

cardRoutes.post("/", async (req, res) => {
  const { message, gifURL, author } = req.body;
  const newCard = await prisma.card.create({
    data: {
      message,
      gifURL,
      author,
    },
  });
  res.json(newCard);
});

cardRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { message, gifURL, author } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(id) },
    data: {
      message,
      gifURL,
      author,
    },
  });
  res.json(updatedCard);
});

cardRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedCard);
});

export default cardRoutes;