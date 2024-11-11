// animalLife.model.js
const sql = require("./db.js");

const AnimalLife = function(subPost) {
    this.post_id = subPost.post_id;
    this.user_id = subPost.user_id;
    this.content = subPost.content;
    this.likes = subPost.likes || 0;
    this.views = subPost.views || 0;
};

// Create a new sub-post
AnimalLife.create = (newSubPost, result) => {
    sql.query("INSERT INTO animal_life SET ?", newSubPost, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newSubPost });
    });
};

// Fetch all sub-posts for a given main post
AnimalLife.findByPostId = (postId, result) => {
    sql.query("SELECT * FROM animal_life WHERE post_id = ?", [postId], (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Increment view count
AnimalLife.incrementViewCount = (subPostId, result) => {
    sql.query("UPDATE animal_life SET views = views + 1 WHERE id = ?", [subPostId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Increment like count
AnimalLife.incrementLikeCount = (subPostId, result) => {
    sql.query("UPDATE animal_life SET likes = likes + 1 WHERE id = ?", [subPostId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Delete a sub-post
AnimalLife.delete = (subPostId, result) => {
    sql.query("DELETE FROM animal_life WHERE id = ?", [subPostId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = AnimalLife;
