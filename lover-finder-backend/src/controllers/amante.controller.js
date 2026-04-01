const amanteService = require('../services/amante.service');

class AmanteController {
    /**
     * POST /amantes — Create a new lover profile.
     */
    async create(req, res) {
        try {
            const result = await amanteService.createAmante(req.body);

            if (!result.success) {
                return res.status(400).json({ errors: result.errors });
            }

            return res.status(201).json(result.data);
        } catch (error) {
            console.error('Error creating amante:', error);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }

    /**
     * GET /amantes?interes=x — List profiles matching a given interest.
     */
    async findByInteres(req, res) {
        try {
            const { interes } = req.query;

            if (!interes || interes.trim() === '') {
                return res.status(400).json({
                    error: 'El parámetro de consulta "interes" es obligatorio.',
                });
            }

            const result = await amanteService.findByInteres(interes.trim());
            return res.status(200).json(result.data);
        } catch (error) {
            console.error('Error searching amantes:', error);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }
}

module.exports = new AmanteController();
