// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
global.__basedir = __dirname;

// CORS options
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Base route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Stray Animal Care API." });
});

// Include route files
require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/animalLife.routes")(app);
require("./app/routes/chat.routes")(app);
require("./app/routes/mapLocation.routes")(app);

// Set up the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Set server timeouts
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
