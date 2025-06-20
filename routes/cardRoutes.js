console.log("CARD ROUTES FILE LOADED");
import express from "express";
import { PrismaClient } from "../src/generated/prisma/index.js";
const cardRoutes = express.Router();

const prisma = new PrismaClient();

// Get all cards
cardRoutes.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get specific card
cardRoutes.get("/:id", async (req, res) => {
  try {
    const parsedId = parseInt(req.params.id);
    const card = await prisma.card.findUnique({
      where: { id: parsedId },
      include: { board: true },
    });

    if (card) {
      res.json(card);
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    res.status(500).send("An error occured while fetching the card");
  }
});

// Create new card
cardRoutes.post("/", async (req, res) => {
  try {
    const { message, gifURL, author, boardId } = req.body;
    if (!boardId) {
      return res.status(400).json("Board id is required");
    }

    const board = await prisma.board.findUnique({
      where: { id: parseInt(boardId) },
    });

    if (!board) {
      return res.status(404).json("Board not found");
    }
    const newCard = await prisma.card.create({
      data: {
        message,
        gifURL,
        author,
        boardId: parseInt(boardId),
      },
    });
    res.json(newCard);
  } catch (error) {
    res.status(500).send("An error occured while creating the card");
  }
});

// Update a card
cardRoutes.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send("An error occured while updating the card");
  }
});

// Upvote a card
cardRoutes.patch("/:id/upvote", async (req, res) => {
  try {
    const cardId = req.params.id;
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(cardId) },
      data: {
        upvotes: { increment: 1 },
      },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).send("An error occured while upvoting the card");
  }
});

// Delete a card
cardRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await prisma.card.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedCard);
  } catch (error) {
    res.status(500).send("An error occured while deleting the card");
  }
});

export default cardRoutes;
