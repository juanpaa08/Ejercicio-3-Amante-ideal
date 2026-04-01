const { Router } = require('express');
const amanteController = require('../controllers/amante.controller');

const router = Router();

// POST /amantes — Create a new lover profile
router.post('/', amanteController.create.bind(amanteController));

// GET /amantes?interes=x — List profiles matching a given interest
router.get('/', amanteController.findByInteres.bind(amanteController));

module.exports = router;
