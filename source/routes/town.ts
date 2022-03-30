import express from 'express';
import controller from '../controllers/town';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getTowns);
router.post('/', extractJWT, controller.createTown);
router.put('/:id', extractJWT, controller.updateTown);
router.delete('/:id', extractJWT, controller.deleteTown);

export = router;
