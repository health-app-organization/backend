const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.get('/', providerController.getAllProviders);
router.get('/:id', providerController.getProviderById);
router.post('create', providerController.createProvider);
router.put('update/:id', providerController.updateProvider);
router.delete('delete/:id', providerController.deleteProvider);

module.exports = router;
