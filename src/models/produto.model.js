module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            nome: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!'
            },
            valor_base: {
                type: mongoose.Schema.Types.Decimal128,
                default: 0.00
            },
            tipo: {
                type: Number,
                enum: [0, 1, 2],
                default: 0
            },
            marca: {
                type: mongoose.Schema.Types.ObjectId,
                required: 'O campo {PATH} deverá ser informado!',
                ref: 'Marca'
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
    const Produto = mongoose.model("produto", schema);
    return Produto;
};