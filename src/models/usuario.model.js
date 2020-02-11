module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            nome: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!'
            },
            email: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!',
                unique: 'O campo {PATH} já foi registrado!',
                lowercase: true
            },
            login: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!',
                unique: true,
                lowercase: true
            },
            senha: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!',
                select: false
            },
            telefone: {
                type: String,
            }
        },
        {
            timestamps: true
        }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Usuario = mongoose.model("usuario", schema);
    return Usuario;
};
