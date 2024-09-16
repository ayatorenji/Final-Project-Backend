// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();

// Global directory
global.__basedir = __dirname;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/animalLife.routes")(app);
require("./app/routes/chat.routes")(app);
require("./app/routes/mapLocation.routes")(app);

// Default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Stray Animal Care API." });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
