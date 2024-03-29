const sql = require("./db.js");

const AnimalLife = function(animalLife) {
    this.post_id = animalLife.post_id;
    this.user_id = animalLife.user_id;
    this.content = animalLife.content;
    this.image = animalLife.image;
};

AnimalLife.create = (newEntry, result) => {
    sql.query("INSERT INTO animal_life SET ?", newEntry, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        console.log("created animal_life entry: ", { id: res.insertId, ...newEntry });
        result(null, { id: res.insertId, ...newEntry });
    });
};

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

AnimalLife.updateById = (id, userId, animalLife, result) => {
    sql.query(
        "UPDATE animal_life SET content = ?, image = ? WHERE id = ? AND user_id = ?",
        [animalLife.content, animalLife.image, id, userId],
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
            console.log("updated animal_life entry: ", { id: id, ...animalLife });
            result(null, { id: id, ...animalLife });
        }
    );
};

AnimalLife.remove = (id, result) => {
    sql.query("DELETE FROM animal_life WHERE id = ?", id, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted animal life with id: ", id);
        result(null, res);
    });
};

module.exports = AnimalLife;
