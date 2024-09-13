// chat.routes
module.exports = app => {
    const chat_controller = require("../controllers/chat.controller.js");
    var router = require("express").Router();
    router.post("/send", chat_controller.sendMessage);
    router.get("/messages/:postId/:senderId/:receiverId", chat_controller.getMessages);
    router.get("/post/:postId", chat_controller.getChatsByPostId);
    app.use("/api/chats", router);
  };