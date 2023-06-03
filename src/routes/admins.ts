import express from 'express';
const router = express.Router();
import authJwt from '../middleware/auth';
import {
    createAdminValidation, findByIdValidation, updateAdminValidation,
    deleteAdminValidation, loginAdminValidation, jwtAdminValidation
} from '../middleware/validators/adminValidator';
import {
    adminRegister, fetchAdmins, fetchAdminById,
    updateAdmin, deleteAdmin, adminLogin
} from '../controllers/AdminsController';

router.post('/create', createAdminValidation, jwtAdminValidation, authJwt, adminRegister);
router.get('/fetchAdmins', jwtAdminValidation, authJwt, fetchAdmins);
router.get('/fetchAdmin/:id?', findByIdValidation, jwtAdminValidation, authJwt, fetchAdminById);
router.put('/updateAdmin/:id?', updateAdminValidation, jwtAdminValidation, authJwt, updateAdmin);
router.delete('/deleteAdmin/:id?', deleteAdminValidation, jwtAdminValidation, authJwt, deleteAdmin);
router.post('/adminLogin', loginAdminValidation, adminLogin);

export default router;