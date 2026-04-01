const Amante = require('./models/amante.model');

const seedData = [
    {
        nombre: 'Carlos López',
        edad: 28,
        intereses: ['música', 'viajes', 'cocina'],
    },
    {
        nombre: 'María García',
        edad: 24,
        intereses: ['lectura', 'yoga', 'música'],
    },
    {
        nombre: 'Andrés Martínez',
        edad: 32,
        intereses: ['deportes', 'tecnología', 'viajes'],
    },
    {
        nombre: 'Lucía Fernández',
        edad: 21,
        intereses: ['arte', 'fotografía', 'cocina'],
    },
    {
        nombre: 'Diego Ramírez',
        edad: 26,
        intereses: ['música', 'deportes', 'videojuegos'],
    },
];

/**
 * Seed the database with sample profiles if the collection is empty.
 */
async function seedDatabase() {
    try {
        const count = await Amante.countDocuments();

        if (count === 0) {
            await Amante.insertMany(seedData);
            console.log('🌱 Base de datos sembrada con 5 perfiles de ejemplo.');
        } else {
            console.log(`📦 La colección ya tiene ${count} documentos. Seed omitido.`);
        }
    } catch (error) {
        console.error('❌ Error al sembrar la base de datos:', error.message);
    }
}

module.exports = seedDatabase;
