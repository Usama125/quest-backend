import express from 'express';
import controller from '../controllers/city';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getCities);
router.post('/', extractJWT, controller.createCity);
router.put('/:id', extractJWT, controller.updateCity);
router.delete('/:id', extractJWT, controller.deleteCity);

export = router;
