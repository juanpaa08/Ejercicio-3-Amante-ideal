const Amante = require('../models/amante.model');

class AmanteRepository {
    /**
     * Create a new Amante document.
     * @param {Object} data - Validated amante data.
     * @returns {Promise<Object>} The created document.
     */
    async create(data) {
        const amante = new Amante(data);
        return amante.save();
    }

    /**
     * Find amantes whose intereses array contains the given interest (case-insensitive).
     * @param {string} interes - Interest to search for.
     * @returns {Promise<Array>} Matching documents.
     */
    async findByInteres(interes) {
        return Amante.find({
            intereses: { $regex: new RegExp(`^${interes}$`, 'i') },
        }).lean();
    }

    /**
     * Count total documents in the collection.
     * @returns {Promise<number>}
     */
    async count() {
        return Amante.countDocuments();
    }
}

module.exports = new AmanteRepository();
