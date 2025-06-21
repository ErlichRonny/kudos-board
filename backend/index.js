import express from "express";
import cors from 'cors'
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import { Prisma } from '@prisma/client';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle common Prisma errors (e.g., unique constraint violation)
    if (err.code === 'P2002') {
      return res.status(400).json({ error: "A unique constraint violation occurred." })
    }
  }

  res.status(500).json({ error: "Internal Server Error" })
})

app.use(express.json())
app.use(cors());

app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);
