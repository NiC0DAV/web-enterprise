import express from 'express';
const router = express.Router();

const { tenantRegister } = require('../controllers/TenantsController');
const { createAdminValidation } = require('../middleware/validators/tenantValidator');

router.post('/create', createAdminValidation, tenantRegister);

export default router;