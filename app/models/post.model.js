// post.model
const sql = require("./db.js");

const Post = function(post) {
    this.title = post.title;
    this.description = post.description;
    this.image = post.image;
    this.user_id = post.user_id;
    this.adopted = post.adopted || false;
};

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        console.log("created the post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found post: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Post.getAll = result => {
    let query = "SELECT posts.id, posts.title, posts.description, posts.image, ";
    query += "posts.created_at, posts.updated_at, posts.adopted, ";
    query += "users.id AS user_id, ";
    query += "users.fullname AS author, "; // Alias fullname as author
    query += "users.img AS user_img ";
    query += "FROM posts ";
    query += "JOIN users ON posts.user_id = users.id";
    
    sql.query(query, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        console.log("posts: ", res);
        result(null, res);
    });
};

Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE posts SET title = ?, description = ?, image = ? WHERE id = ?",
        [post.title, post.description, post.image, id],
        (err, res) => {
            if (err) {
                console.error("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated post: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.remove = (id, result) => {
    console.log("Post ID to be deleted:", id);
    sql.query("DELETE FROM map_locations WHERE post_id = ?", id, (err, res) => {
        if (err) {
            console.error("Error while deleting map locations: ", err);
            result(null, err);
            return;
        }

        sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
            if (err) {
                console.error("Error while deleting post: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                console.log("No post found with ID: ", id);
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Post deleted successfully with ID: ", id);
            result(null, res);
        });
    });
};

Post.markByID = (id, post, result) => {
    sql.query(
        "UPDATE posts SET adopted = ? WHERE id = ?",
        [post.adopted, id],
        (err, res) => {
            if (err) {
                console.error("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("marked post: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.getAllAdopted = result => {
    sql.query("SELECT * FROM posts WHERE adopted = 1", (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        console.log("adopted posts: ", res);
        result(null, res);
    });
};

module.exports = Post;