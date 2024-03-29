module.exports = app => {
    const animalLife_controller = require("../controllers/animalLife.controller.js");
    var router = require("express").Router();
    router.post("/", animalLife_controller.create);
    router.get("/:post_id", animalLife_controller.findByPostId);
    router.put("/:id", animalLife_controller.update);
    router.delete("/:id", animalLife_controller.delete);
    app.use('/api/animalLife', router);
};
