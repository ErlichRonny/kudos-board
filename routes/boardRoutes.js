import express from "express";
import { PrismaClient } from "../src/generated/prisma/index.js";
const boardRoutes = express.Router();

const prisma = new PrismaClient();

// Get all boards
boardRoutes.get("/", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get specific board
boardRoutes.get("/:id", async (req, res) => {
  try {
    const parsedId = parseInt(req.params);
    const board = await prisma.board.findUnique({
      where: { id: parsedId },
      include: { cards: true },
    });

    if (board) {
      res.json(board);
    } else {
      res.status(404).send("Board not found");
    }
  } catch (error) {
    res.status(500).send("An error occured while fetching the board");
  }
});

// Create new board
boardRoutes.post("/", async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        author,
      },
    });
    res.json(newBoard);
  } catch (error) {
    res.status(500).send("An error occured while creating the board");
  }
});

// Update a board
boardRoutes.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send("An error occured while updating the board");
  }
});

// Delete a board
boardRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoard = await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedBoard);
  } catch (error) {
    res.status(500).send("An error occured while deleting the board");
  }
});

// Get all cards for specific board
boardRoutes.get("/:id/cards", async (req, res) => {
  try {
    const parsedId = parseInt(req.params);
    const cards = await prisma.board.findMany({
      where: { boardId: parsedId },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).send("An error occured while fetching the cards");
  }
});

// Add card to specified board
boardRoutes.post("/:id/cards", async (req, res) => {
  try {
    const { id } = req.params;
    const { message, gifURL, author } = req.body;

    const newCard = await prisma.card.create({
      data: {
        message,
        gifURL,
        author,
        boardId: parseInt(id),
      },
    });
    res.json(newCard);
  } catch (error) {
    res.status(500).send("An error occured while creating the board");
  }
});

export default boardRoutes;
