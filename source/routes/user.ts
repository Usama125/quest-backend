import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/register-admin', controller.register);
router.post('/login', controller.login);

export = router;
