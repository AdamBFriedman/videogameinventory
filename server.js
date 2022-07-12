const express = require("express");
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 8000;

// Custom logger
app.use(logger);

// Routes
app.use("/", require("./routes/root"));

// Error routes
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "pages", "error.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404: Not Found" });
    } else {
      res.type("txt").send("404: Not Found");
    }
  });

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));