module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            nome: {
                type: String,
                required: 'O campo {PATH} deverá ser informado!'
            },
            data: {
                type: Date,
                default: Date.now
            },
            finalizada: {
                type: Boolean,
                default: false
            },
            total: {
                type: mongoose.Schema.Types.Decimal128,
                default: 0.00
            },
            mercado: {
                type: mongoose.Schema.Types.ObjectId,
                required: 'O campo {PATH} deverá ser informado!',
                ref: 'Mercado'
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
    const Compra = mongoose.model("compra", schema);
    return Compra;
};