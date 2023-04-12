const express = require('express');
const router = express.Router();

const { tenantRegister } = require('../controllers/TenantsController');

router.post('/create', tenantRegister);

module.exports = router;