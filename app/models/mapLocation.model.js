//mapLocation.model.js
const sql = require("./db.js");

const MapLocation = function(mapLocation) {
    this.post_id = mapLocation.post_id;
    this.latitude = mapLocation.latitude;
    this.longitude = mapLocation.longitude;
    this.description = mapLocation.description;
};

MapLocation.create = (newLocation, result) => {
    sql.query("INSERT INTO map_locations SET ?", newLocation, (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }
        console.log("created map location: ", { id: res.insertId, ...newLocation });
        result(null, { id: res.insertId, ...newLocation });
    });
};

MapLocation.findByPostId = (postId, result) => {
    const query = `
      SELECT latitude, longitude, description AS locationName
      FROM map_locations 
      WHERE post_id = ?
    `;
    
    sql.query(query, [postId], (err, res) => {
        if (err) {
            console.error("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found location: ", res[0]);
            result(null, res[0]); // Return location data
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

MapLocation.findAll = (result) => {
  const query = `
    SELECT m.latitude, m.longitude, m.description, p.title, p.description as postDescription, p.image as postImage, p.created_at, p.updated_at, p.adopted, u.fullname, u.img as userImage
    FROM map_locations m
    JOIN posts p ON m.post_id = p.id
    JOIN users u ON p.user_id = u.id
  `;

  sql.query(query, (err, res) => {
      if (err) {
          console.error("error: ", err);
          result(err, null);
          return;
      }

      console.log("retrieved all locations: ", res);
      result(null, res);
  });
};


MapLocation.updateByPostId = (postId, location, result) => {
    sql.query(
      "UPDATE map_locations SET latitude = ?, longitude = ?, description = ? WHERE post_id = ?",
      [location.latitude, location.longitude, location.description, postId],
      (err, res) => {
        if (err) {
          console.error("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated location: ", { post_id: postId, ...location });
        result(null, { post_id: postId, ...location });
      }
    );
  };
  

module.exports = MapLocation;
