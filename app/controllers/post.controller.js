//post.controller
const Post = require("../models/post.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        user_id: req.body.user_id
    });

    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    Post.updateById(
        req.params.postId,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.postId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + req.params.postId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + req.params.postId
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};

exports.markAdopted = (req, res) => {
    const postId = req.params.id;

    Post.markByID(postId, { adopted: true }, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Post with id " + postId
                });
            }
        } else res.send({ message: "Post was marked as adopted successfully." });
    });
};

exports.findAllAdopted = (req, res) => {
    Post.getAllAdopted((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving adopted posts."
            });
        } else {
            res.send(data);
        }
    });
};

