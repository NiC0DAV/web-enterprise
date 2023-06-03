import express from 'express';
import { jwtAdminValidation } from '../middleware/validators/adminValidator';
import { createSubscription, fetchSubscriptions, fetchSubscriptionsById } from '../controllers/SubscriptionsController';
import { createSubscriptionValidation, findByIdValidation } from '../middleware/validators/subscriptionValidator';
const router = express.Router();

router.post('/create', jwtAdminValidation, createSubscriptionValidation, createSubscription);
router.get('/get', jwtAdminValidation, fetchSubscriptions);
router.get('/getById/:id?', jwtAdminValidation, findByIdValidation, fetchSubscriptionsById);

export default router;