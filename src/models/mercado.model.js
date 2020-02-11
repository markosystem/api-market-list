module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            nome: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!'
            },
            endereco: {
                type: String
            },
            telefone: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!'
            },
            email: {
                type: String,
                lowercase: true,
            },
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                required: 'O campo {PATH} deverá ser informado!',
                ref: 'Usuario'
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
    const Mercado = mongoose.model("mercado", schema);
    return Mercado;
};