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

     // Sub-post routes
     router.get("/sub-posts", post_controller.findAllSubPosts);
     router.get("/:postId/details", post_controller.getPostDetails);  // Fetch main post details along with sub-posts
     router.post("/:postId/sub-posts", post_controller.addSubPost);    // Add a new sub-post
     router.put("/sub-posts/:subPostId/like", post_controller.likeSubPost);  // Like a sub-post
     router.delete("/sub-posts/:subPostId", post_controller.deleteSubPost);  // Delete a sub-post
     
    app.use("/api/post", router);
};
