const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/models");
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// requests of content-type - application/json
app.use(bodyParser.json());

// requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// route of test
app.get("/", (req, res) => {
    res.json({ message: "API Market-list working!" });
});

//all routes
require("./src/routes/mercado.routes")(app);
require("./src/routes/usuario.routes")(app);
require("./src/routes/marca.routes")(app);
require("./src/routes/produto.routes")(app);
require("./src/routes/compra.routes")(app);
require("./src/routes/produto_compra.routes")(app);

// set port, listen for requests
console.log(`PORT ${process.env.PORT}`)
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// config mapping database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });