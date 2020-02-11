const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.mercados = require("./mercado.model.js")(mongoose);
db.usuarios = require("./usuario.model.js")(mongoose);
db.marcas = require("./marca.model.js")(mongoose);
db.produtos = require("./produto.model.js")(mongoose);
db.compras = require("./compra.model.js")(mongoose);
db.produtos_compras = require("./produto_compra.model.js")(mongoose);

module.exports = db;