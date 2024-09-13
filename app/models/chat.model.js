//chat.model
const sql = require("./db.js");

const Chat = function(chat) {
  this.post_id = chat.post_id;
  this.sender_id = chat.sender_id;
  this.receiver_id = chat.receiver_id;
  this.message = chat.message;
};

Chat.sendMessage = (newChat, result) => {
  sql.query("INSERT INTO chats SET ?", newChat, (err, res) => {
      if (err) {
          console.error("error: ", err);
          result(err, null);
          return;
      }
      console.log("created chat: ", { id: res.insertId, ...newChat });
      result(null, { id: res.insertId, ...newChat });
  });
};

Chat.getChatsByPostId = (postId, result) => {
  sql.query(`SELECT * FROM chats WHERE post_id = ? GROUP BY sender_id`, [postId], (err, res) => {
      if (err) {
          console.error("error: ", err);
          result(err, null);
          return;
      }
      console.log("found chats: ", res);
      result(null, res);
  });
};

Chat.getMessages = (postId, senderId, receiverId, result) => {
  sql.query(`SELECT * FROM chats WHERE post_id = ? AND ((sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)) ORDER BY timestamp`,
      [postId, senderId, receiverId, receiverId, senderId], (err, res) => {
      if (err) {
          console.error("error: ", err);
          result(err, null);
          return;
      }
      console.log("found messages: ", res);
      result(null, res);
  });
};


module.exports = Chat;
