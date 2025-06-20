import express from "express";
import cors from 'cors'
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(express.json())
app.use(cors());

app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);
