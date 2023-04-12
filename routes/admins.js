const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const { createAdminValidation, findByIdValidation, updateAdminValidation, deleteAdminValidation, loginAdminValidation, jwtAdminValidation } = require('../middleware/validators/adminValidator');
const { adminRegister, fetchAdmins, fetchAdminById, updateAdmin, deleteAdmin, adminLogin } = require('../controllers/AdminsController');

router.post('/create', createAdminValidation, jwtAdminValidation, authJwt, adminRegister);
router.get('/fetchAdmins', jwtAdminValidation, authJwt, fetchAdmins);
router.get('/fetchAdmin/:id?', findByIdValidation, jwtAdminValidation, authJwt, fetchAdminById);
router.put('/updateAdmin/:id?', updateAdminValidation, jwtAdminValidation, authJwt, updateAdmin);
router.delete('/deleteAdmin/:id?', deleteAdminValidation, jwtAdminValidation, authJwt, deleteAdmin);
router.post('/adminLogin', loginAdminValidation, adminLogin);

module.exports = router;