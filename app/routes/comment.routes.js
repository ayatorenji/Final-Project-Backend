// comment.routes.js
module.exports = app => {
    const comment_controller = require("../controllers/comment.controller.js");
    const router = require("express").Router();

    router.post("/", comment_controller.create);
    router.get("/:subPostId", comment_controller.findByPostId);

    app.use("/api/comments", router);
};
