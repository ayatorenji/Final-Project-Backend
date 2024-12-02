// animalLife.model.js
const sql = require("./db.js");

const SubPost = function(subPost) {
    this.post_id = subPost.post_id;
    this.user_id = subPost.user_id;
    this.content = subPost.content;
    this.image = subPost.image;
    this.likes = subPost.likes || 0;
};

// Retrieve all sub-posts for a given main post ID
SubPost.findByPostId = (subPostId, result) => {
    const query = `
        SELECT a.id, a.post_id, a.user_id, a.content, a.image, a.likes, a.created_at, a.updated_at, u.fullname, u.img as userImage
        FROM animal_life a
        JOIN users u ON a.user_id = u.id
        WHERE a.post_id = ?
    `;

    sql.query(query, [subPostId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Create a new sub-post
SubPost.create = (newSubPost, result) => {
    sql.query("INSERT INTO animal_life SET ?", newSubPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created the sub post: ", { id: res.insertId, ...newSubPost });
        result(null, { id: res.insertId, ...newSubPost });
    });
};

// Increment likes for a sub-post
SubPost.incrementLikeCount = (subPostId, result) => {
    sql.query("UPDATE animal_life SET likes = likes + 1 WHERE id = ?", [subPostId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // No rows were updated, meaning the subPostId does not exist
            result({ kind: "not_found" }, null);
        } else {
            // Fetch the new likes count to return it
            sql.query("SELECT likes FROM animal_life WHERE id = ?", [subPostId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, res[0]); // return the row with the new likes count
            });
        }
    });
};

// Delete a sub-post by ID
SubPost.delete = (id, result) => {
    sql.query("DELETE FROM animal_life WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

SubPost.getAll = result => {
    let query = "SELECT animal_life.id AS sub_post_id, animal_life.content, animal_life.image, ";
    query += "animal_life.likes, animal_life.created_at, animal_life.updated_at, ";
    query += "users.id AS user_id, users.fullname AS author, users.img AS user_image, ";
    query += "posts.title AS post_title ";
    query += "FROM animal_life ";
    query += "JOIN users ON animal_life.user_id = users.id ";
    query += "JOIN posts ON animal_life.post_id = posts.id ";
    query += "WHERE animal_life.post_id = ?";
    
    sql.query(query, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }

        console.log("sub-posts: ", res);
        result(null, res);
    });
};

module.exports = SubPost;
