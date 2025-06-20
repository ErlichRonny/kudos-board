const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const boardRoutes = require('./routes/boardRoutes')
const cardRoutes = require('./routes/cardRoutes')

app.use('/boards', boardRoutes)

app.use('/cards',cardRoutes)