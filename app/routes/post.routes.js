// post.routes
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

    router.get("/:postId/details", post_controller.getPostDetails);
    router.post("/:postId/sub-posts", post_controller.addSubPost);
    router.post("/:postId/increment-view", post_controller.incrementViewCount);
    router.put("/:subPostId/like", post_controller.likeSubPost);
    router.put("/:subPostId/edit", post_controller.editSubPost);
    router.delete("/:subPostId", post_controller.deleteSubPost);

    app.use("/api/post", router);
};
