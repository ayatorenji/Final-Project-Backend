//mapLocation.routes.js

module.exports = app => {
    const mapLocation_controller = require("../controllers/mapLocation.controller.js");
    var router = require("express").Router();
    router.post("/", mapLocation_controller.create);
    router.get("/:postId", mapLocation_controller.findByPostId);
    router.get("/", mapLocation_controller.findAll);
    router.put("/:postId", mapLocation_controller.update);
    app.use("/api/map-location", router);
};
