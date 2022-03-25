import express from 'express';
import controller from '../controllers/game';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getGames);
router.post('/', extractJWT, controller.createGame);
router.put('/:id', extractJWT, controller.updateGame);
router.delete('/:id', extractJWT, controller.deleteGame);

export = router;
