const express = require('express');
const router = express.Router();
const { createAdminValidation, findByIdValidation } = require('../middleware/validators/adminValidator');
const { adminRegister, fetchAdmins, fetchAdminById, updateAdmin } = require('../controllers/adminController');

router.post('/create', createAdminValidation, adminRegister);
router.get('/fetchAdmins', fetchAdmins);
router.get('/fetchAdmin/:id?', findByIdValidation, fetchAdminById);

module.exports = router;