//post.controller
const Post = require("../models/post.model.js");
const SubPost = require("../models/animalLife.model.js");

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

// Fetch main post details along with sub-posts
exports.getPostDetails = (req, res) => {
    const postId = req.params.postId;

    Post.findById(postId, (err, post) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Post with id ${postId}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Post with id " + postId
                });
            }
        }

        SubPost.findByPostId(postId, (err, subPosts) => {
            if (err) {
                return res.status(500).send({
                    message: "Error retrieving sub-posts for post with id " + postId,
                });
            }

            res.send({ post, subPosts });  // Send both the post and subPosts in the response
        });
    });
};


// Add a new sub-post
exports.addSubPost = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    const subPost = {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
        content: req.body.content,
        image: req.body.image,
    };
    SubPost.create(subPost, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "Error adding sub-post to post with id " + req.body.post_id,
            });
        }
        res.send(data);
    });
};

// Increment like count for a sub-post
exports.likeSubPost = (req, res) => {
    const subPostId = req.params.subPostId;
    SubPost.incrementLikeCount(subPostId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Sub-post with id ${subPostId} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error liking sub-post with id " + subPostId
                });
            }
        } else {
            res.send(data); 
        }
    });
};

// Delete a sub-post
exports.deleteSubPost = (req, res) => {
    const subPostId = req.params.subPostId;
    SubPost.delete(subPostId, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "Error deleting sub-post with id " + subPostId,
            });
        }
        res.send({ message: "Sub-post deleted successfully!" });
    });
};

exports.findAllSubPosts = (req, res) => {
    SubPost.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving sub-posts."
            });
        } else res.send(data);
    });
};

// Count posts by a specific user
exports.countUserPosts = (req, res) => {
    Post.countByUserId(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while counting posts." });
        else res.send({ totalPostsByUser: data });
    });
};

// Count all posts
exports.countAllPosts = (req, res) => {
    Post.countAll((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while counting all posts." });
        else res.send({ totalPosts: data });
    });
};

// Count sub-posts by a specific user
exports.countSubPostsByUser = (req, res) => {
    const userId = req.params.userId;
    SubPost.countByUserId(userId, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while counting sub-posts by user." });
        } else {
            res.send({ totalSubPostsByUser: data });
        }
    });
};

exports.countPostsOverTime = (req, res) => {
    Post.countPostsOverTime((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while counting posts over time." });
        else res.send(data);
    });
};
