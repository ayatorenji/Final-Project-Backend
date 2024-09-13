//mapLocation.controller.js
const MapLocation = require("../models/mapLocation.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const mapLocation = new MapLocation({
        post_id: req.body.post_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
    });

    MapLocation.create(mapLocation, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the map location."
            });
        else res.send(data);
    });
};

exports.findByPostId = (req, res) => {
    MapLocation.findByPostId(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found location with post ID ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving location with post ID " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
  MapLocation.findAll((err, data) => {
      if (err) {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving all map locations."
          });
      } else res.send(data);
  });
};

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Content cannot be empty!"
      });
    }
  
    const updatedLocation = {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description: req.body.description,
    };
  
    MapLocation.updateByPostId(req.params.postId, updatedLocation, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found location for post ID ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating location for post ID " + req.params.postId
          });
        }
      } else res.send(data);
    });
  };
  