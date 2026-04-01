const mongoose = require('mongoose');

const amanteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
        },
        edad: {
            type: Number,
            required: [true, 'La edad es obligatoria'],
            min: [18, 'La edad mínima es 18 años'],
        },
        intereses: {
            type: [String],
            required: [true, 'Los intereses son obligatorios'],
            validate: {
                validator: (arr) => Array.isArray(arr) && arr.length > 0,
                message: 'Debe incluir al menos un interés',
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Amante', amanteSchema);
