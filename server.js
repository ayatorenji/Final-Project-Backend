const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
var corsOptions = {origin: "*"};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.json({ message: "Welcome to the Stray Animal Care API."});
});
require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/animalLife.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
});
