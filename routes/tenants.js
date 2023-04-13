const express = require('express');
const router = express.Router();

const { tenantRegister } = require('../controllers/TenantsController');
const { createAdminValidation } = require('../middleware/validators/tenantValidator');

router.post('/create', createAdminValidation, tenantRegister);

module.exports = router;