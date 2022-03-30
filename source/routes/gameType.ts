import express from 'express';
import controller from '../controllers/gameType';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/', extractJWT, controller.getGameTypes);
router.post('/', extractJWT, controller.createGameType);
router.put('/:id', extractJWT, controller.updateGameType);
router.delete('/:id', extractJWT, controller.deleteGameType);

export = router;
