const db = require("../models");
const Marca = db.marcas;

exports.findOne = (req, res) => {
    const id = req.params.id;
    Marca.findById(id)
        .then(data => {
            if (!data)
                return res.status(404).send({
                    name: "NotFound",
                    message: ['O Registro não foi encontrado!'],
                    data: []
                });
            return res.send({
                name: "Success",
                message: ['O Registro foi encontrado com sucesso!'],
                data: [data]
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                name: "Error",
                message: [`Erro ao tentar encontrar o Registro com id = ${id}`],
                data: []
            });
        });
};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { $regex: new RegExp(nome), $options: "i" } } : {};

    Marca.find(condition)
        .then(data => {
            res.send({
                name: "Success",
                message: ['Busca realizada com sucesso!'],
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

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            name: "Validation",
            message: ["Todos os campos são requeridos!"],
            data: []
        });
    }

    const marca = new Marca({
        nome: req.body.nome,
        usuario: req.body.usuario
    });

    marca
        .save(marca)
        .then(data => {
            res.send({
                name: "Success",
                message: ["O Registro foi cadastrado com sucesso!"],
                data: [data]
            });
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            name: "Validation",
            message: ["Todos os campos são requeridos!"],
            data: []
        });
    }

    const id = req.params.id;

    Marca.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    name: "NotFound",
                    message: ['O Registro não foi encontrado para atualização!'],
                    data: []
                });
            }
            return res.send({
                name: "Success",
                message: ["O Registro foi atualizado com sucesso!"],
                data: [data]
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                name: "Error",
                message: ['Ocorreu um erro ao atualizar o Registro!'],
                data: [data]
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Marca.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    name: "NotFound",
                    message: ['O Registro não foi encontrado para remoção!'],
                    data: []
                });
            }
            return res.send({
                name: "Success",
                message: ["O Registro foi removido com sucesso!"],
                data: []
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                name: "Error",
                message: ['Ocorreu um erro ao remover o Registro!'],
                data: []
            });
        });
};

exports.deleteAll = (req, res) => {
    Marca.deleteMany({})
        .then(data => {
            if (data.deletedCount == 0) {
                return res.send({
                    name: "Success",
                    message: ['Todos os Registros já foram removidos!'],
                    data: []
                });
            }
            res.send({
                name: "Success",
                message: [`${data.deletedCount} Registro(s) removido(s) com sucesso!`],
                data: []
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                name: "Error",
                message: [err.message || "Ocorreu um erro ao remover os Registros!"],
                data: []
            });
        });
};