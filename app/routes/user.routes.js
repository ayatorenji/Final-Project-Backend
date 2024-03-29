const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const user_controller = require("../controllers/user.controller");
    var router = require("express").Router();
    router.get("/:us", user_controller.validUsername);
    router.post("/signup", user_controller.createNewUser);
    router.post("/login", user_controller.login);
    router.put("/:id/rate", user_controller.updateRating);
    router.get("/", authJwt, user_controller.getAllUsers);
    router.put("/:id", authJwt, user_controller.updateUserCtrl);
    router.delete("/:id/:p1/:p2", authJwt, user_controller.deleteUser);
    app.use("/api/auth", router);
};