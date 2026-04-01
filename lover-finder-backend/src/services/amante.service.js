const amanteRepository = require('../repositories/amante.repository');
const { validateCreateAmante } = require('../dtos/amante.dto');

class AmanteService {
    /**
     * Validate and create a new amante profile.
     * @param {Object} body - Raw request body.
     * @returns {Promise<Object>} { success: boolean, data?: Object, errors?: string[] }
     */
    async createAmante(body) {
        const { errors, data } = validateCreateAmante(body);

        if (errors) {
            return { success: false, errors };
        }

        const amante = await amanteRepository.create(data);
        return { success: true, data: amante };
    }

    /**
     * Find amantes by a given interest.
     * @param {string} interes - Interest keyword.
     * @returns {Promise<Object>} { success: boolean, data: Array }
     */
    async findByInteres(interes) {
        const results = await amanteRepository.findByInteres(interes);
        return { success: true, data: results };
    }
}

module.exports = new AmanteService();
