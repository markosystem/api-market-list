module.exports = app => {
    let controller = require("../controllers/usuario.controller.js");
    let router = require("express").Router();

    router.post("/", controller.create);
    router.post("/login", controller.login);
    app.use('/api/usuarios', router);
};