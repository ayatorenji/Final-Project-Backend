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
    router.get("/count/:userId", post_controller.countUserPosts);
    router.get("/count-all", post_controller.countAllPosts);

     // Sub-post routes
     router.get("/sub-posts", post_controller.findAllSubPosts);
     router.get("/:postId/details", post_controller.getPostDetails); 
     router.post("/:postId/sub-posts", post_controller.addSubPost);   
     router.put("/sub-posts/:subPostId/like", post_controller.likeSubPost); 
     router.delete("/sub-posts/:subPostId", post_controller.deleteSubPost);
     router.get("/sub-posts/count/:userId", post_controller.countSubPostsByUser);
     
    app.use("/api/post", router);
};
