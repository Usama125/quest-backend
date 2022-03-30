import express from 'express';
import controller from '../controllers/game';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getGames);
router.get('/:id', extractJWT, controller.getSingleGame);
router.post('/', extractJWT, controller.createGame);
router.put('/:id', extractJWT, controller.updateGame);
router.delete('/:id', extractJWT, controller.deleteGame);

export = router;
