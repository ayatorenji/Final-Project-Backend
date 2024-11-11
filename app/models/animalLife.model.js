// animalLife.model.js
const sql = require("./db.js");

const AnimalLife = function(subPost) {
    this.post_id = subPost.post_id;
    this.user_id = subPost.user_id;
    this.content = subPost.content;
    this.likes = subPost.likes || 0;
};

// Retrieve all sub-posts for a given main post ID
AnimalLife.findByPostId = (postId, result) => {
    sql.query("SELECT * FROM animal_life WHERE post_id = ?", [postId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Create a new sub-post
AnimalLife.create = (newSubPost, result) => {
    sql.query("INSERT INTO animal_life SET ?", newSubPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newSubPost });
    });
};

// Increment likes for a sub-post
AnimalLife.incrementLikeCount = (subPostId, result) => {
    sql.query("UPDATE animal_life SET likes = likes + 1 WHERE id = ?", [subPostId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: subPostId });
    });
};

// Delete a sub-post by ID
AnimalLife.delete = (id, result) => {
    sql.query("DELETE FROM animal_life WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = AnimalLife;
