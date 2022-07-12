const express = require("express");
const app = express();
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 8000;

// Custom logger
app.use(logger);

// Routes
app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));