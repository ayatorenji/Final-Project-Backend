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
        console.log("created post: ", { id: res.insertId, ...newPost });
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
    query += "users.fullname AS author "; // Alias fullname as author
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
    sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Post with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted post with id: ", id);
        result(null, res);
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