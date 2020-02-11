module.exports = app => {
    let controller = require("../controllers/mercado.controller.js");
    let router = require("express").Router();

    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    router.delete("/", controller.deleteAll);
    app.use('/api/mercados', router);
};