module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                required: 'O campo {PATH} deverá ser informado!',
                ref: 'Produto'
            },
            compra: {
                type: mongoose.Schema.Types.ObjectId,
                required: 'O campo {PATH} deverá ser informado!',
                ref: 'Compra'
            },
            quantidade: {
                type: Number,
                required: 'O campo {PATH} deverá ser informado!',
                default: 1
            },
            valor_unitario: {
                type: mongoose.Schema.Types.Decimal128,
                default: 0.00
            },
            finalizado: {
                type: Boolean,
                default: false
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
    const ProdutoCompra = mongoose.model("produto_compra", schema);
    return ProdutoCompra;
};