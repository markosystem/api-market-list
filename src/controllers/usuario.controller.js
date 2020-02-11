const db = require("../models");
const Usuario = db.usuarios;

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            name: "Validation",
            message: ["Todos os campos são requeridos!"],
            data: []
        });
    }

    const usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        login: req.body.login,
        senha: req.body.senha,
        telefone: req.body.telefone,
    });

    usuario
        .save(usuario)
        .then(data => {
            res.send({
                name: "Success",
                message: ["O Registro foi cadastrado com sucesso!"],
                data: [data]
            });
        })
        .catch(err => {
            if (err.name == 'ValidationError' || err.name == 'MongoError') {
                console.error('Error Validating!', err);
                return res.status(422).json(err);
            }
            console.error(err);
            return res.status(500).send({
                name: "Error",
                message: ["Ocorreu um erro ao salvar o Registro!"],
                data: []
            });
        });
};

exports.login = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            name: "Validation",
            message: ["Todos os campos são requeridos!"],
            data: []
        });
    }

    Usuario.find({ 
            login: req.body.login, 
            senha: req.body.senha
        })
        .then(data => {
            if (!data || data.length == 0) {
                return res.status(404).send({
                    name: "NotFound",
                    message: ['Usuário ou senha inválidos!'],
                    data: []
                });
            }
            return res.send({
                name: "Success",
                message: ['Usuário encontrado com sucesso!'],
                data: [data]
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                name: "Error",
                message: [err.message || "Ocorreu um erro ao retornar os Registros!"],
                data: []
            });
        });
};