const AnimalLife = require("../models/animalLife.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const animalLife = new AnimalLife({
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        content: req.body.content,
        image: req.body.image
    });

    AnimalLife.create(animalLife, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AnimalLife."
            });
        else res.send(data);
    });
};

exports.findByPostId = (req, res) => {
    AnimalLife.findByPostId(req.params.post_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AnimalLife with post_id ${req.params.post_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving AnimalLife with post_id " + req.params.post_id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    AnimalLife.updateById(
        req.params.id,
        new AnimalLife(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AnimalLife with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AnimalLife with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    AnimalLife.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found AnimalLife with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete AnimalLife with id " + req.params.id
                });
            }
        } else res.send({ message: `AnimalLife was deleted successfully!` });
    });
};