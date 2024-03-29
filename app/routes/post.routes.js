module.exports = app => {
    const post_controller = require("../controllers/post.controller.js");
    var router = require("express").Router();
    router.post("/", post_controller.create);
    router.get("/all", post_controller.findAll);
    router.get("/adopted", post_controller.findAllAdopted);
    router.get("/:postId", post_controller.findOne);
    router.put("/:postId", post_controller.update);
    router.delete("/:postId", post_controller.delete);
    router.put("/:id/mark", post_controller.markAdopted);
    app.use("/api/post", router);
};
