//file.routes
module.exports = app => {
    const file_controller = require("../controllers/file.controllers");
    var router = require("express").Router();
    router.post("/upload", file_controller.uploadController);
    router.get("/:name", file_controller.displayAvatar);
    app.use("/api/file", router);
};