// comment.model.js
const sql = require("./db.js");

const Comment = function(comment) {
    this.sub_post_id = comment.sub_post_id;
    this.user_id = comment.user_id;
    this.content = comment.content;
    this.created_at = new Date();
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        console.log("created comment: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.findBySubPostId = (subPostId, result) => {
    sql.query(
        `SELECT comments.comment_id, comments.ment, comments.created_at, 
        users.fullname AS author, users.img AS user_img
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE comments.sub_post_id = ? 
        ORDER BY comments.created_at DESC`,
        [subPostId],
        (err, res) => {
            if (err) {
                console.error("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

module.exports = Comment;
