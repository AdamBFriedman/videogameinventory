const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const { logger } = require('./middleware/logEvents');
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 8000;

// Custom logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Handle form data
app.use(express.urlencoded({ extended: false }));

// Handle json data
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));

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

// Custom error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));