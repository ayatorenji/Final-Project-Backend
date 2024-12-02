// comment.controller.js
const Comment = require("../models/comment.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!",
        });
    }

    const comment = new Comment({
        sub_post_id: req.body.sub_post_id,
        user_id: req.body.user_id,
        ment: req.body.ment,
    });

    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment.",
            });
        } else res.send(data);
    });
};

exports.findBySubPostId = (req, res) => {
    const subPostId = req.params.subPostId;

    Comment.findBySubPostId(subPostId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving comments for sub-post with id " + subPostId,
            });
        } else res.send(data);
    });
};
