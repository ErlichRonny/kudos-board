import express from "express";
import { PrismaClient } from "../src/generated/prisma/index.js";
const boardRoutes = express.Router();

const prisma = new PrismaClient();

boardRoutes.get("/", async (req, res) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
});

boardRoutes.post("/", async (req, res) => {
  const { title, category, author } = req.body;
  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
      author,
    },
  });
  res.json(newBoard);
});

boardRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, author } = req.body;
  const updatedBoard = await prisma.board.update({
    where: { id: parseInt(id) },
    data: {
      title,
      category,
      author,
    },
  });
  res.json(updatedBoard);
});

boardRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedBoard);
});

export default boardRoutes;
