//chat.controller
const Chat = require("../models/chat.model.js");

exports.sendMessage = (req, res) => {
  if (!req.body) {
      res.status(400).send({
          message: "Content cannot be empty!"
      });
  }

  const chat = new Chat({
      post_id: req.body.post_id,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message
  });

  Chat.sendMessage(chat, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Some error occurred while sending the message."
          });
      } else res.send(data);
  });
};

exports.getChatsByPostId = (req, res) => {
  Chat.getChatsByPostId(req.params.postId, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving chats."
          });
      } else res.send(data);
  });
};

exports.getMessages = (req, res) => {
  const { postId, senderId, receiverId } = req.params;
  Chat.getMessages(postId, senderId, receiverId, (err, data) => {
      if (err) {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving messages."
          });
      } else res.send(data);
  });
};